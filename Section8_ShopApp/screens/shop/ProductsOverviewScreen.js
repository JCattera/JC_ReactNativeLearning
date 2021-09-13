import React, { useState, useEffect, useCallback } from 'react';
import {
  Platform,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsRefreshing, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  // initial loading of products
  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(setIsLoading(false));
  }, [dispatch, loadProducts, setIsLoading]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate({
      routeName: 'ProductDetails',
      params: {
        productId: id,
        productTitle: title,
      },
    });
  };
  const renderProductItem = (itemData) => {
    return (
      <ProductItem
        title={itemData.item.title}
        price={itemData.item.price}
        imageUrl={itemData.item.imageUrl}
        onSelect={() => {
          selectItemHandler(itemData.item.id, itemData.item.title);
        }}
      >
        <Button
          color={Colors.primaryColor}
          title="View Details"
          onPress={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        />
        <Button
          color={Colors.accentColor}
          title="Add to cart"
          onPress={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      </ProductItem>
    );
  };
  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Reload"
          onPress={loadProducts}
          color={Colors.primaryColor}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }
  if (!isLoading && availableProducts.length == 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Add some!</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={availableProducts}
      keyExtractor={(item) => item.id}
      renderItem={renderProductItem}
      style={{ width: '100%' }}
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
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
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

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default ProductsOverviewScreen;
