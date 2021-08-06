import React from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ProductItem from './ProductItem'
import * as cartActions from '../../store/actions/cart';
const ProductList = (props) => {
  const dispatch = useDispatch();
  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        title={itemData.item.title}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
        onViewDetails={() => {
          props.navigateFunction({
            routeName: 'ProductDetails',
            params: {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            },
          });
        }}
        onAddToCart={() => {
          dispatch(cartActions.addToCart(itemData.item));
        }}
      ></ProductItem>
    );
  };
  return (
    <View>
      <FlatList
        data={props.displayedProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

export default ProductList;
