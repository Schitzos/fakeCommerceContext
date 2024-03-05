import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import ProductItem from '../ProductItem';
import {StyleSheet, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../navigation/types';

interface ProductItemData {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductFragmentsProps {
  data: ProductItemData[];
  isLoading: boolean;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const Product: React.FC<ProductFragmentsProps> = ({
  data,
  isLoading,
  navigation,
}) => {
  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <ProductItem data={item} navigation={navigation} />
        )}
        keyExtractor={item => item.title}
        numColumns={2}
        contentContainerStyle={styles.flatListStyle}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  flatListStyle: {
    paddingBottom: 64,
  },
});
