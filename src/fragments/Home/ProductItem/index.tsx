import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RootStackParamList} from '../../../navigation/types';

interface ProductData {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}

interface ProductItemProps {
  data: ProductData;
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

export default function ProductItem({data, navigation}: ProductItemProps) {
  const {title, image, id, price, rating} = data;
  const isSingleLine = title.length <= 20; // Adjust the threshold as needed

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Detail', {id: id})}>
      <View style={styles.productInfo}>
        <FastImage
          style={styles.image}
          source={{
            uri: image,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text
          style={[styles.title, isSingleLine ? styles.singleLineTitle : null]}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.productBottomInfo}>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.title}>
          {rating.rate}/{rating.count} Review
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 12,
  },
  price: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
  },
  singleLineTitle: {
    overflow: 'hidden',
  },
  image: {
    width: 125,
    height: 200,
  },
  productInfo: {
    flex: 1,
    width: '100%',
    gap: 8,
    alignItems: 'center',
  },
  productBottomInfo: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
