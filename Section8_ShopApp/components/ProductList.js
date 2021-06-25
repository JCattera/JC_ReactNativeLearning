import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import ProductItem from './ProductItem';
const ProductList = (props) => {
  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        title={itemData.item.title}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default ProductList;
