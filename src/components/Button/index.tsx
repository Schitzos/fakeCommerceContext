import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import TextView from '../TextView';
import theme from '../../theme';

interface ButtonViewProps {
  onPress: () => void;
  color?: string;
  size?: 'sm' | 'md';
  variant?: 'fill' | 'outline';
  label: string;
}

export default function ButtonView({
  onPress,
  color = theme.colors.neutral200,
  variant = 'fill',
  label,
  size = 'md',
}: ButtonViewProps) {
  return (
    <TouchableOpacity
      style={[
        variant === 'fill' ? styles.btnCart : styles.btnCartOutLine,
        size === 'md' ? styles.btnMD : styles.btnSM,
        {
          backgroundColor:
            variant === 'fill' && color !== undefined
              ? color
              : variant === 'fill'
              ? theme.colors.neutral200
              : theme.colors.white,
        },
      ]}
      onPress={onPress}>
      <TextView
        fz={size === 'sm' ? 12 : 16}
        fw="600"
        color={
          variant === 'fill' ? theme.colors.white : theme.colors.neutral200
        }>
        {label}
      </TextView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnCart: {
    backgroundColor: theme.colors.neutral200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCartOutLine: {
    backgroundColor: theme.colors.white,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.colors.neutral200,
    borderWidth: 1,
  },
  btnMD: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 16,
  },
  btnSM: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textOutLine: {},
});
