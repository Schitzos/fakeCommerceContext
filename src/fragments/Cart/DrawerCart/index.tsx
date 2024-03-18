import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {useCart} from '../../../hooks/useCart';
import TextView from '../../../components/TextView';
import CartItem from '../CartItem';
import {ScrollView} from 'react-native-gesture-handler';
import theme from '../../../theme';
import ButtonView from '../../../components/Button';

type DrawerNavigationProps = {
  navigation: DrawerNavigationHelpers;
};

export default function DrawerCart({navigation}: DrawerNavigationProps) {
  const {cart, updateCart, selectCart, clearCart} = useCart();

  const handleCounter = (val: number, id: number) => {
    updateCart(val, id);
  };

  const handleSelectedCart = (id: number, val: boolean) => {
    selectCart(val, id);
  };

  return (
    <View style={styles.base}>
      <SafeAreaView />
      <TextView fz={24} fw="bold">
        Cart
      </TextView>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartContainer}>
            {cart.length === 0 && <TextView>No item in Cart</TextView>}
            {cart.length !== 0 &&
              cart.map(val => {
                return (
                  <CartItem
                    data={val}
                    handleCounter={handleCounter}
                    handleSelectedCart={handleSelectedCart}
                    key={val.id}
                  />
                );
              })}
          </View>
        </ScrollView>
        <View style={styles.checkoutInfo}>
          <View style={styles.flexRow}>
            <TextView>Total Item</TextView>
            <TextView fw="bold">
              {cart.filter(val => val.selected).length}
            </TextView>
          </View>
          <View style={styles.flexRow}>
            <TextView>Sub Total</TextView>
            <TextView fw="bold">
              $
              {cart
                .filter(val => val.selected)
                .reduce((sum, product) => sum + (product?.total || 0), 0)
                .toFixed(2)}
            </TextView>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <ButtonView
            label="Checkout"
            onPress={() => navigation.navigate('Checkout')}
            size="sm"
          />
          <ButtonView
            label="Clear Cart"
            onPress={() => clearCart()}
            size="sm"
            variant="outline"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 16,
    borderTopColor: theme.colors.neutral100,
    borderTopWidth: 2,
  },
  cartContainer: {
    gap: 8,
    padding: 8,
  },
  cartItem: {
    gap: 4,
  },
  cartItemTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  singleLineTitle: {
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
  },
  productInfoCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnContainer: {
    gap: 8,
    paddingBottom: 32,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutInfo: {
    borderTopColor: theme.colors.neutral200,
    borderTopWidth: 2,
    paddingVertical: 8,
  },
});
