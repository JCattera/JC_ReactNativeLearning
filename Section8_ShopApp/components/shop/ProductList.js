import React from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ProductItem from './ProductItem';
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
    <View style={styles.list}>
      <FlatList
        data={props.displayedProducts}
        keyExtractor={(item, index) => item.id}
        renderItem={renderProductItem}
        style={{ width: '100%' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // padding: 15,
  },
});

export default ProductList;
