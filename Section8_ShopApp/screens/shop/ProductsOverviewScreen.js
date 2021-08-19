import React from 'react';
import { Platform, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';
const ProductsOverviewScreen = (props) => {
  const availableProducts = useSelector(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();
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
  return (
    <FlatList
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

export default ProductsOverviewScreen;
