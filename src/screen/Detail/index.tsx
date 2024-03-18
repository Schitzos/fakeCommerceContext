import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/types';
import {useCart} from '@/hooks/useCart';
import {HeaderNavigation} from '@/components/HeaderNavigation';
import Cart from '@/components/Cart';
import {ProductDetail} from '@/fragments/Detail/ProductDetail';
import FloatingAddToCart from '@/fragments/Detail/FloatingAddToCart';
import {styles} from './styles';

type DetailScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
};

export default function Detail({navigation, route}: DetailScreenProps) {
  const {data} = route.params;
  const {addToCart} = useCart();
  const [productOrderCount, setProductOrderCount] = useState(1);

  const handleAddToCart = () => {
    const payload = {
      ...data,
      count: productOrderCount,
      total: data?.price * productOrderCount,
      selected: true,
    };
    addToCart(payload);
    navigation.dispatch(DrawerActions.openDrawer());
    setProductOrderCount(1);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setProductOrderCount(1);
      };
    }, []),
  );

  const updateProduct = useCallback((val: number) => {
    setProductOrderCount(val);
  }, []);

  return (
    <View style={styles.base}>
      <HeaderNavigation
        backShown={true}
        title="Product Detail"
        rightSection={Cart}
      />
      <ProductDetail
        data={data}
        productOrderCount={productOrderCount}
        updateProduct={updateProduct}
      />
      <FloatingAddToCart
        handleAddToCart={handleAddToCart}
        id={data.id}
        price={data.price}
        productOrderCount={productOrderCount}
      />
    </View>
  );
}
