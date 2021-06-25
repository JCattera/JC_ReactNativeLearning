import React from 'react';
import { View, StyleSheet, Text, Image, Button } from 'react-native';

const ProductItem = (props) => {
  return (
    <View style={styles.product}>
      <Image style={styles.image} source={{ uri: props.imageUrl }} />
      <Text>{props.title}</Text>
      <Text>{props.price}</Text>
      <View style={styles.buttonView}>
        <Button title="View Details" />
        <Button title="Add to cart" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 5,
    margin: 20,
    borderRadius: 10,
    height: 300,
  },
  image: {
    height: 200,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default ProductItem;
