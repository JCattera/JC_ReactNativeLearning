import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';

const ProductList = (props) => {
  const renderProductItem = (itemData) => {
    return <Text>{itemData.item.title}</Text>;
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
