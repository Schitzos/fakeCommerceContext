import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getListProduct} from '../../services/product/product.service';
import Product from '../../fragments/Home/Product';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import HeaderNavigation from '../../components/HeaderNavigation';
import Cart from '../../components/Cart';
import {ProductItemProps} from '../../types/Product';

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

export default function Home({navigation}: HomeScreenProps) {
  const productList = getListProduct({
    limit: 10,
    key: ['getListProduct'],
    offset: 0,
  });

  const product = productList.data as ProductItemProps[];
  return (
    <View style={styles.container}>
      <HeaderNavigation title="Fake Commerce" rightSection={Cart} />
      <Product
        data={product}
        isLoading={productList.isFetching}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 12,
  },
});
