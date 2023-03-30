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
      <View style={styles.wrapper}>
        <Icon name="Pin" size={24} color={AdditionalColors.white} />
        <View style={styles.buttonText}>
          <Typo variant="button" color={TextColors.white}>
            {children}
          </Typo>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    alignSelf: 'center',
  },
  buttonText: {
    marginLeft: 8,
  },
  wrapper: {
    backgroundColor: 'rgba(81, 89, 112, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 100,
  },
});
