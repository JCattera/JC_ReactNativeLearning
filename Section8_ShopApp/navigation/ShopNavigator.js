import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';

const stackNavigatorOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
  },
  /*
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  */
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
    },
    ProductDetails: {
      screen: ProductDetailsScreen,
    },
    Cart: {
      screen: CartScreen,
    },
  },
  {
    defaultNavigationOptions: stackNavigatorOptions,
  }
);

export default createAppContainer(ProductsNavigator);
