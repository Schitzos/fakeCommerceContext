/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from './types';
import {createStackNavigator} from '@react-navigation/stack';
import route from './route';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Button, Text, View} from 'react-native';
import {debuglog} from '../utils/common/debug';

const Stack = createStackNavigator<RootStackParamList>(); // Specify the param list type
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <View>
      <Text>Custom drawer</Text>
      <Button
        title="go to checkout"
        onPress={() => props.navigation.navigate('Checkout')}
      />
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false, drawerPosition: 'right'}}
      drawerContent={props => {
        debuglog('props', props);
        return <CustomDrawerContent {...props} />;
      }}>
      <Drawer.Screen name="Home" component={route.HomeScreen} />
      <Drawer.Screen name="Detail" component={route.DetailScreen} />
    </Drawer.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
        initialRouteName={'Cart'}>
        {/*<Stack.Screen name="Home" component={route.HomeScreen} />*/}
        <Stack.Screen name="Order" component={route.OrderScreen} />
        <Stack.Screen name="Checkout" component={route.CheckoutScreen} />
        <Stack.Screen name="Cart" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
