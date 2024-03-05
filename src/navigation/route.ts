import React from 'react';
import {Suspensed} from './suspense';

export default {
  HomeScreen: Suspensed(React.lazy(() => import('../screen/Home'))),
  DetailScreen: Suspensed(React.lazy(() => import('../screen/Detail'))),
  OrderScreen: Suspensed(React.lazy(() => import('../screen/Order'))),
  CheckoutScreen: Suspensed(React.lazy(() => import('../screen/Checkout'))),
};
