import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Button,
  ScrollView,
} from 'react-native';

const ProductDetailsScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const selectedProduct = availableProducts.find(
    (product) => product.id === productId
  );
  return (
    <ScrollView>
      <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
      <View>
        <Text>${selectedProduct.price.toFixed(2)}</Text>
      </View>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  const productTitle = navData.navigation.getParam('produtTitle');
  return {
    headerTitle: productTitle,
  };
};
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
});

export default ProductDetailsScreen;
