import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';

import DefaultText from '../DefaultText';

const ProductItem = (props) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS == 'android' && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground={true}>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.imageUrl }} />
            </View>
            <View style={styles.productInfo}>
              <DefaultText style={styles.title}>{props.title}</DefaultText>
              <DefaultText style={styles.price}>
                ${props.price.toFixed(2)}
              </DefaultText>
            </View>
            <View style={styles.buttonView}>{props.children}</View>
          </View>
        </TouchableComponent>
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
    borderRadius: 10,
    margin: 20,
    height: 300,
  },
  touchable: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily: 'open-sans-bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '25%',
    paddingHorizontal: 20,
  },
  productInfo: {
    alignItems: 'center',
    height: '15%',
    padding: 10,
  },
  imageContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: '100%',
    height: '60%',
    overflow: 'hidden',
  },
});

export default ProductItem;
