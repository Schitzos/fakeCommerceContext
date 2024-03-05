import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {getProduct} from '../../services/product/product.service';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import FastImage from 'react-native-fast-image';
import {debuglog} from '../../utils/common/debug';
import HeaderNavigation from '../../components/HeaderNavigation';

type DetailScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
};

interface ProductItemDataResponse {
  id: number;
  title: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  description: string;
  category: string;
}

export default function Detail({route}: DetailScreenProps) {
  const {id} = route.params;

  const productDetailReq = getProduct({
    id: id,
    key: ['getProduct', id],
  });

  const productDetail = productDetailReq.data as ProductItemDataResponse;
  debuglog('productDetail', productDetail);
  return (
    <View style={styles.base}>
      <HeaderNavigation backShown={true} title="Detail" />
      <View style={styles.topInfo}>
        <Text style={styles.title}>{productDetail?.title}</Text>
        <Text style={styles.category}>{productDetail?.category}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <FastImage
            style={styles.image}
            source={{
              uri: productDetail?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.productInfo}>
            <Text style={styles.price}>${productDetail?.price}</Text>
            <Text style={styles.description}>{productDetail?.description}</Text>
          </View>
          <View style={styles.productReviewInfo}>
            <Text style={styles.description}>
              {productDetail?.rating.rate} from {productDetail?.rating.count}{' '}
              Review
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnCart}>
          <Text style={styles.btnCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    position: 'relative',
  },
  topInfo: {
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 8,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
  },
  category: {
    fontSize: 16,
    textAlign: 'right',
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    paddingVertical: 8,
    paddingBottom: 132,
    paddingHorizontal: 16,
    gap: 8,
  },
  productInfo: {
    flex: 1,
    gap: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    textAlign: 'justify',
  },
  image: {
    width: 250,
    height: 350,
  },
  btnContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    position: 'absolute',
    bottom: 0,
  },
  btnCart: {
    backgroundColor: '#6D6D6D',
    paddingHorizontal: 16,
    paddingVertical: 16,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnCartText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productReviewInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
