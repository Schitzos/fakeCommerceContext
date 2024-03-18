import {useContext, Dispatch, SetStateAction} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CartContext} from '../context/CartContext';
import {ProductItemProps} from '../types/Product';
import dayjs from 'dayjs';

interface UseCartResult {
  cart: ProductItemProps[];
  addToCart: (newItem: ProductItemProps) => void;
  updateCart: (val: number, id: number) => void;
  selectCart: (val: boolean, id: number) => void;
  setCart: Dispatch<SetStateAction<ProductItemProps[]>>;
  clearCart: () => void;
}

export function useCart(): UseCartResult {
  const useCartContext = () => {
    const contextValue = useContext(CartContext);
    if (contextValue === null) {
      return {
        cart: [],
        setCart: () => {},
      };
    }

    return contextValue;
  };
  const {cart, setCart} = useCartContext();

  const clearCart = () => {
    AsyncStorage.clear();
    setCart([]);
  };

  const addToCart = (newItem: ProductItemProps) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex(
      item => item.id === newItem.id,
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        count: updatedCart[existingProductIndex].count + newItem.count,
        total: updatedCart[existingProductIndex].total + newItem.total,
        updatedAt: dayjs(),
      };
    } else {
      newItem.updatedAt = dayjs();
      updatedCart.push(newItem);
    }
    const sortedCartByDate = updatedCart.sort(
      (a: ProductItemProps, b: ProductItemProps) =>
        dayjs(b.updatedAt).toDate().getTime() -
        dayjs(a.updatedAt).toDate().getTime(),
    );

    setCart(sortedCartByDate);
  };

  const updateCart = (val: number, id: number) => {
    const existingProductIndex = cart.findIndex(
      (item: ProductItemProps) => item.id === id,
    );
    const updatedCart = [...cart];

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        count: val,
        total: updatedCart[existingProductIndex].price * val,
      };
    }
    setCart(updatedCart);
  };

  const selectCart = (val: boolean, id: number) => {
    const existingProductIndex = cart.findIndex(
      (item: ProductItemProps) => item.id === id,
    );
    const updatedCart = [...cart];

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex] = {
        ...updatedCart[existingProductIndex],
        selected: val,
      };
    }
    setCart(updatedCart);
  };

  return {
    cart,
    addToCart,
    updateCart,
    selectCart,
    setCart,
    clearCart,
  };
}
