import { SERVER_URL } from '@env';
import * as React from 'react';
import { useState, Dispatch, SetStateAction } from 'react';
import { Platform } from 'react-native';

type VideoroomContextType = {
  roomNameState: [string, Dispatch<SetStateAction<string>>];
  serverUrlState: [string, Dispatch<SetStateAction<string>>];
  displayNameState: [string, Dispatch<SetStateAction<string>>];
  isSimulcastOnState: [boolean, Dispatch<SetStateAction<boolean>>];
};

const VideoroomContext = React.createContext<VideoroomContextType | undefined>(
  undefined
);

const VideoroomContextProvider = (props) => {
  const [roomName, setRoomName] = useState<string>('room');
  const [serverUrl, setServerUrl] = useState<string>(SERVER_URL);
  const [displayName, setDisplayName] = useState<string>(
    `mobile ${Platform.OS}`
  );
  const [isSimulcastOn, setIsSimulcastOn] = useState<boolean>(true);

  return (
    <VideoroomContext.Provider
      value={{
        roomNameState: [roomName, setRoomName],
        serverUrlState: [serverUrl, setServerUrl],
        displayNameState: [displayName, setDisplayName],
        isSimulcastOnState: [isSimulcastOn, setIsSimulcastOn],
      }}
    >
      {props.children}
    </VideoroomContext.Provider>
  );
};

export { VideoroomContext, VideoroomContextProvider };
