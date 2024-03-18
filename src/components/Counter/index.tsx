import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextView from '../TextView';
import theme from '../../theme';

export default function Counter({
  count,
  setCount,
}: {
  count: number;
  setCount: (data: any) => void;
}) {
  const handleIncreament = () => {
    setCount(count + 1); // Update the count in the parent component directly
  };

  const handleDecreament = () => {
    setCount(count - 1); // Update the count in the parent component directly
  };

  return (
    <View style={styles.counter}>
      <TouchableOpacity onPress={handleDecreament} style={styles.btnCounter}>
        <TextView>-</TextView>
      </TouchableOpacity>
      <View>
        <TextView>{count}</TextView>
      </View>
      <TouchableOpacity onPress={handleIncreament} style={styles.btnCounter}>
        <TextView>+</TextView>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  btnCounter: {
    borderWidth: 1,
    borderColor: theme.colors.neutral200,
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
});
