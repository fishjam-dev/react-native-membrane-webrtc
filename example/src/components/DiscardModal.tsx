import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { useVideoroomState } from 'src/VideoroomContext';

import { Modal } from './Modal';
import { StandardButton } from './buttons/StandardButton';

type GoBackAction = Readonly<{
  type: string;
  payload?: object | undefined;
  source?: string | undefined;
  target?: string | undefined;
}>;
type DiscardModalProps = {
  headline: string;
  body: string;
  buttonText: string;
};

export const DiscardModal = ({
  headline,
  body,
  buttonText,
}: DiscardModalProps) => {
  const navigation = useNavigation();
  const { roomName, setRoomName, username, setUsername } = useVideoroomState();
  const modalAction = useRef<GoBackAction>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const handleBeforeRemoveEvent = (e) => {
        if (!roomName && !username) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        e.preventDefault();
        modalAction.current = e.data.action;
        setIsModalVisible(true);
      };

      navigation.addListener('beforeRemove', handleBeforeRemoveEvent);

      return () =>
        navigation.removeListener('beforeRemove', handleBeforeRemoveEvent);
    }, [navigation, roomName, username])
  );

  return (
    <Modal
      headline={headline}
      body={body}
      visible={isModalVisible}
      onClose={() => setIsModalVisible(false)}
    >
      <StandardButton
        type="danger"
        onPress={() => {
          setIsModalVisible(false);
          setRoomName('');
          setUsername('');
          navigation.dispatch(modalAction.current!);
        }}
      >
        {buttonText}
      </StandardButton>
    </Modal>
  );
};
