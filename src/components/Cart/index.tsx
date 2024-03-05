import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconCart from '../../../assets/icon/icon-shopping-cart.svg';
import {DrawerActions, useNavigation} from '@react-navigation/native';

export default function Cart() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.baseLayout}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <IconCart width={24} height={24} />
      <View style={styles.baloon}>
        <Text style={styles.baloonText}>5</Text>
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
  baloonText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
  },
});
