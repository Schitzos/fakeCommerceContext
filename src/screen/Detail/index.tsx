import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../navigation/types';
import FastImage from 'react-native-fast-image';
import HeaderNavigation from '../../components/HeaderNavigation';
import {useCart} from '../../hooks/useCart';
import {DrawerActions, useFocusEffect} from '@react-navigation/native';
import Counter from '../../components/Counter';
import TextView from '../../components/TextView';
import ButtonView from '../../components/Button';
import Cart from '../../components/Cart';

type DetailScreenProps = {
  route: any;
  navigation: StackNavigationProp<RootStackParamList, 'Detail'>;
};

export default function Detail({navigation, route}: DetailScreenProps) {
  const {data} = route.params;
  const {addToCart, cart} = useCart();
  const [productOrderCount, setProductOrderCount] = useState(1);
  const productOnCart = cart.find(val => val.id === data.id);

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

  return (
    <View style={styles.base}>
      <HeaderNavigation
        backShown={true}
        title="Product Detail"
        rightSection={Cart}
      />
      <View style={styles.topInfo}>
        <TextView fz={24}>{data?.title}</TextView>
        <TextView fz={16} align="right">
          {data?.category}
        </TextView>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <FastImage
            style={styles.image}
            source={{
              uri: data?.image,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.productInfo}>
            <View style={styles.productCount}>
              <TextView fz={20} fw="600" align="left">
                ${data?.price}
              </TextView>
              <Counter
                count={productOrderCount}
                setCount={setProductOrderCount}
              />
            </View>
            <TextView fz={14} align="justify">
              {data?.description}
            </TextView>
          </View>
          <View style={styles.productReviewInfo}>
            <TextView fz={14} align="justify">
              {data?.rating.rate} from {data?.rating.count} Review
            </TextView>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnContainer}>
        <View style={styles.orderInfo}>
          <View>
            <TextView>Total Order</TextView>
            <TextView fz={20} fw="600" align="left">
              ${data?.price * productOrderCount}
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
    paddingBottom: 160,
    paddingHorizontal: 16,
    gap: 16,
  },
  productInfo: {
    flex: 1,
    gap: 16,
  },
  productCount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderTopWidth: 2,
    borderColor: '#EEEEEE',
    backgroundColor: 'white',
    left: 0,
    right: 0,
    justifyContent: 'center',
    height: 136,
    position: 'absolute',
    bottom: 0,
    gap: 8,
    paddingVertical: 32,
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productReviewInfo: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
