import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import IconCart from '../../../assets/icon/icon-shopping-cart.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import TextView from '../TextView';
import theme from '../../theme';
import {useCart} from '../../hooks/useCart';

export default function Cart() {
  const navigation = useNavigation();
  const {cart} = useCart();
  return (
    <TouchableOpacity
      style={styles.baseLayout}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <IconCart width={24} height={24} />
      <View style={styles.baloon}>
        <TextView fz={10} color={theme.colors.white}>
          {cart.length}
        </TextView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseLayout: {
    flexDirection: 'row',
  },
  baloon: {
    backgroundColor: '#6D6D6D',
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -8,
  },
});
