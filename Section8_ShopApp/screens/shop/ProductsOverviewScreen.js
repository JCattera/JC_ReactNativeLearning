import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import ProductList from '../../components/shop/ProductList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
const ProductsOverviewScreen = (props) => {
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  return (
    <ProductList
      displayedProducts={availableProducts}
      navigateFunction={props.navigation.navigate}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              // navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      );
    },
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
            onPress={() => {
              navData.navigation.navigate({ routeName: 'Cart' });
            }}
          />
        </HeaderButtons>
      );
    },
  };
};
const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
