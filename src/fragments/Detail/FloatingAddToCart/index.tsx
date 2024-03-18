import ButtonView from '@/components/Button';
import TextView from '@/components/TextView';
import {useCart} from '@/hooks/useCart';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

type FloatingAddToCartProps = {
  productOrderCount: number;
  price: number;
  handleAddToCart: () => void;
  id: number;
};

export default function FloatingAddToCart({
  productOrderCount,
  price,
  handleAddToCart,
  id,
}: FloatingAddToCartProps) {
  const {cart} = useCart();
  const productOnCart = cart.find(val => val.id === id);

  return (
    <View style={styles.btnContainer}>
      <View style={styles.orderInfo}>
        <View>
          <TextView>Total Order</TextView>
          <TextView fz={20} fw="600" align="left">
            ${(price * productOrderCount).toFixed(2)}
          </TextView>
        </View>
        {productOnCart && (
          <View>
            <TextView fw="bold">
              Currently {productOnCart?.count} item in Cart
            </TextView>
          </View>
        )}
      </View>
      <ButtonView
        onPress={() => handleAddToCart()}
        label="Add to Cart"
        size="md"
      />
    </View>
  );
}
