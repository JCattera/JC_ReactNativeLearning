import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductList from '../../components/ProductList';

const ProductsOverviewScreen = (props) => {
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );

  return <ProductList displayedProducts={availableProducts} />;
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};
const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
