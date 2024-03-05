import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import route from './route';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={route.HomeScreen} />
    <Drawer.Screen name="Checkout" component={route.CheckoutScreen} />
    {/* Add more screens for the drawer if needed */}
  </Drawer.Navigator>
);

export default DrawerNavigation;
