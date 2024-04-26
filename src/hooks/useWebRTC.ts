import { Channel, Socket, MessageRef } from 'phoenix';
import { useCallback, useEffect, useState, useRef } from 'react';

import { ConnectionOptions, Metadata } from '../MembraneWebRTC.types';
import MembraneWebRTCModule from '../MembraneWebRTCModule';
import { ReceivableEvents, eventEmitter } from '../common/eventEmitter';

/**
 * This function initialize necessary native objects to properly handle sound and video.
 * Call it only once in your app before any other functionality, otherwise package will not work as intended.
 */
export async function initializeWebRTC() {
  await MembraneWebRTCModule.create();
}

/**
 * The hook used to manage a connection with membrane server.
 * @returns An object with functions to manage membrane server connection and `error` if connection failed.
 */
export function useWebRTC() {
  const [error, setError] = useState<string | null>(null);
  // prevent user from calling connect methods multiple times
  const lock = useRef(false);
  const socket = useRef<Socket | null>(null);
  const webrtcChannel = useRef<Channel | null>(null);
  const onSocketError = useRef<MessageRef | null>(null);
  const onSocketClose = useRef<MessageRef | null>(null);

  useEffect(() => {
    const eventListener = eventEmitter.addListener(
      ReceivableEvents.SendMediaEvent,
      sendMediaEvent
    );
    return () => eventListener.remove();
  }, []);

  const sendMediaEvent = ({ event }: { event: string }) => {
    if (webrtcChannel.current) {
      webrtcChannel.current.push('mediaEvent', { data: event });
    }
  };

  const withLock =
    (f: any) =>
    async (...args: any) => {
      if (lock.current) return Promise.resolve();
      lock.current = true;
      try {
        await f(...args);
      } catch (e) {
        throw e;
      } finally {
        lock.current = false;
      }
    };

  /**
   * Connects to a server.
   * @returns A promise that resolves on success or rejects in case of an error.
   */
  const connect: <ConnectionOptionsMetadataType extends Metadata>(
    /**
     * server url
     */
    url: string,
    roomName: string,
    connectionOptions?: Partial<
      ConnectionOptions<ConnectionOptionsMetadataType>
    >
  ) => Promise<void> = useCallback(
    withLock(
      async <ConnectionOptionsMetadataType extends Metadata>(
        url: string,
        roomName: string,
        connectionOptions: Partial<
          ConnectionOptions<ConnectionOptionsMetadataType>
        > = {}
      ) => {
        setError(null);
        const _socket = new Socket(url, {
          params: connectionOptions.connectionParams,
        });
        _socket.connect();

        onSocketClose.current = _socket.onClose(cleanUp);
        onSocketError.current = _socket.onError(() => {
          setError(`Socket error occured.`);
          cleanUp();
        });

        const _webrtcChannel = _socket.channel(
          `room:${roomName}`,
          connectionOptions.socketChannelParams
        );

        _webrtcChannel.on('mediaEvent', (event) => {
          MembraneWebRTCModule.receiveMediaEvent(event.data);
        });

        _webrtcChannel.on('error', (error) => {
          console.error(error);
          setError(
            `Received error report from the server: ${error.message ?? ''}`
          );
          cleanUp();
        });

        _webrtcChannel.onError((reason) => {
          console.error(reason);
          setError(`Webrtc channel error occurred: ${reason}.`);
          cleanUp();
        });

        socket.current = _socket;
        webrtcChannel.current = _webrtcChannel;
        await new Promise<void>((resolve, reject) => {
          _webrtcChannel
            .join()
            .receive('ok', () => {
              resolve();
            })
            .receive('error', (_response) => {
              console.error(_response);
              reject(_response);
            });
        });

        await MembraneWebRTCModule.connect(
          connectionOptions.endpointMetadata || {}
        );
      }
    ),
    []
  );

  /**
   * Call this to gracefully disconnect from the server. After that you can connect again.
   * @returns A promise that resolves on success or rejects in case of an error.
   */
  const disconnect: () => Promise<void> = useCallback(
    withLock((): Promise<void> => {
      setError(null);
      return cleanUp();
    }),
    []
  );

  const cleanUp = (): Promise<void> => {
    webrtcChannel.current?.leave();
    const refs: MessageRef[] = [];
    if (onSocketClose.current) refs.push(onSocketClose.current);
    if (onSocketError.current) refs.push(onSocketError.current);
    socket.current?.off(refs);
    return MembraneWebRTCModule.disconnect();
  };

  return {
    connect,
    disconnect,
    error,
  };
}
