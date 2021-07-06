import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import DefaultText from '../../components/DefaultText';

const ProductDetailsScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((product) => product.id === productId)
  );

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: selectedProduct.imageUrl }}
          style={styles.image}
        />
      </View>
      <View style={styles.buttonView}>
        <Button
          color={Colors.primaryColor}
          title="Add to Cart"
          onPress={() => {}}
        />
      </View>
      <View style={styles.priceView}>
        <DefaultText style={styles.price}>
          ${selectedProduct.price.toFixed(2)}
        </DefaultText>
      </View>
      <View>
        <DefaultText style={styles.description}>
          {selectedProduct.description}
        </DefaultText>
      </View>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam('productTitle');
  return {
    headerTitle: productTitle,
  };
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  buttonView: {
    // width: '50%',
    alignItems: 'center',
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'open-sans-bold',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 300,
    padding: 10,
  },
  priceView: {
    alignItems: 'center',
  },
  description: {
    // textAlign: 'center',
    fontSize: 14,
    marginHorizontal: 20,
  },
});

export default ProductDetailsScreen;
