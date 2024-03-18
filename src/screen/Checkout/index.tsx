import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import HeaderNavigation from '../../components/HeaderNavigation';
import {useCart} from '../../hooks/useCart';
import TextView from '../../components/TextView';
import theme from '../../theme';
import CheckoutItemView from '../../fragments/Checkout/CheckoutItem';
import ButtonView from '../../components/Button';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';

type CheckoutScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Checkout'>;
};

export default function Checkout({navigation}: CheckoutScreenProps) {
  const {cart} = useCart();
  const selectedCart = cart.filter(val => val.selected);

  return (
    <View style={styles.base}>
      <HeaderNavigation backShown={true} title="Checkout" />
      <ScrollView>
        <View style={styles.cartContainer}>
          {selectedCart.length === 0 && <TextView>No item in Cart</TextView>}
          {selectedCart.length !== 0 &&
            selectedCart.map(val => {
              return <CheckoutItemView data={val} key={val.id} />;
            })}
        </View>
      </ScrollView>
      <View style={styles.checkoutInfo}>
        <View style={styles.flexRow}>
          <TextView fz={16}>Total Item</TextView>
          <TextView fw="bold" fz={16}>
            {cart.filter(val => val.selected).length}
          </TextView>
        </View>
        <View style={styles.flexRow}>
          <TextView fz={16}>Sub Total</TextView>
          <TextView fw="bold" fz={16}>
            $
            {cart
              .filter(val => val.selected)
              .reduce((sum, product) => sum + (product?.total || 0), 0)
              .toFixed(2)}
          </TextView>
        </View>
        <ButtonView
          label="Confirm Order"
          onPress={() => navigation.navigate('Checkout')}
          size="md"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    position: 'relative',
    backgroundColor: theme.colors.white,
  },
  cartContainer: {
    gap: 8,
    padding: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.white,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutInfo: {
    borderTopColor: theme.colors.neutral200,
    borderTopWidth: 2,
    paddingTop: 16,
    paddingBottom: 32,
    paddingHorizontal: 16,
    gap: 8,
  },
});
