import { AdditionalColors, TextColors } from '@colors';
import { Icon } from '@components/Icon';
import { Typo } from '@components/Typo';
import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PinButtonProp = {
  onPress: () => void;
  children: ReactNode;
};

export const PinButton = ({ children, onPress }: PinButtonProp) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name="Pin" size={24} color={AdditionalColors.white} />
      <View style={styles.buttonText}>
        <Typo variant="button" color={TextColors.white}>
          {children}
        </Typo>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(81, 89, 112, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
  },
  buttonText: {
    marginLeft: 8,
  },
});
