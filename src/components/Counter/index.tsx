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
  return (
    <View style={styles.counter}>
      <TouchableOpacity
        onPress={() => count !== 1 && setCount(count - 1)}
        style={styles.btnCounter}>
        <TextView>-</TextView>
      </TouchableOpacity>
      <View>
        <TextView>{count}</TextView>
      </View>
      <TouchableOpacity
        onPress={() => setCount(count + 1)}
        style={styles.btnCounter}>
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
