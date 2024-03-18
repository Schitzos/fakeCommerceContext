import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';

export interface CartContextType {
  cart: any;
  setCart: (newData: any) => void;
}

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartContext = createContext<CartContextType | null>(null);
export const CART_STATE_KEY = 'cart-data';

export default function CartContextProvider({children}: CartProviderProps) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (cart.length !== 0) {
      AsyncStorage.setItem(CART_STATE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    AsyncStorage.getItem(CART_STATE_KEY).then((value: string | null) => {
      if (value) {
        const parse = JSON.parse(value || '');
        setCart(parse);
      }
    });
  }, []);

  return (
    <CartContext.Provider value={{cart, setCart}}>
      {children}
    </CartContext.Provider>
  );
}
