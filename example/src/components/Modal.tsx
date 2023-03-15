import { AdditionalColors, ShadowColors } from '@colors';
import { Typo } from '@components/Typo';
import React, { ReactNode } from 'react';
import { StyleSheet, Modal as RNModal, View } from 'react-native';

import { StandardButton } from './buttons/StandardButton';

const ModalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ShadowColors.modal,
  },
  modal: {
    alignSelf: 'center',
    width: 358,
    justifyContent: 'center',
    backgroundColor: AdditionalColors.white,
    borderRadius: 16,
  },
  content: {
    paddingLeft: 24,
    paddingRight: 24,
  },
  header: {
    marginTop: 32,
  },
  body: {
    marginTop: 8,
  },
  topButton: {
    marginTop: 40,
  },
  bottomButton: {
    marginTop: 16,
    marginBottom: 32,
  },
});

type ModalProps = {
  headline?: string;
  body?: string;
  visible: boolean;
  children: ReactNode;
  setVisibility: Function;
};

export const Modal = ({
  headline,
  body,
  visible,
  children,
  setVisibility,
}: ModalProps) => {
  if (!visible) return null;

  return (
    <RNModal visible={visible}>
      <View style={ModalStyles.centeredView}>
        <View style={ModalStyles.modal}>
          <View style={ModalStyles.content}>
            <View style={ModalStyles.header}>
              <Typo variant="h4">{headline}</Typo>
            </View>
            <View style={ModalStyles.body}>
              <Typo variant="body-small">{body}</Typo>
            </View>
            <View style={ModalStyles.topButton}>{children}</View>
            <View style={ModalStyles.bottomButton}>
              <StandardButton
                type="secondary"
                onPress={() => {
                  setVisibility(false);
                }}
              >
                Cancel
              </StandardButton>
            </View>
          </View>
        </View>
      </View>
    </RNModal>
  );
};
