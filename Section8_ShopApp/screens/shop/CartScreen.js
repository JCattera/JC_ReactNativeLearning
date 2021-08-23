import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import Card from '../../components/UI/Card';

const CartScreen = (props) => {
  const totalCartAmount = useSelector((state) => state.cart.totalCartAmount);
  const cartItems = useSelector((state) => {
    return Object.entries(state.cart.cartItems)
      .map((x) => {
        const i = x[1];
        i['id'] = x[0];
        return i;
      })
      .sort((a, b) => (a.id > b.id ? 1 : -1)); // to ensure they're sorted by id
  });
  const dispatch = useDispatch();
  const renderCartItem = (itemData) => {
    return (
      <CartItem
        title={itemData.item.productTitle}
        price={itemData.item.sumTotal}
        quantity={itemData.item.quantity}
        inCart={true}
        onIncrement={() => {
          dispatch(cartActions.changeCartItemQuantity(itemData.item.id, true));
        }}
        onDecrement={() => {
          dispatch(cartActions.changeCartItemQuantity(itemData.item.id, false));
        }}
        onDeleteItem={() => {
          dispatch(cartActions.clearCartItem(itemData.item.id));
        }}
      />
    );
  };
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.abs(totalCartAmount).toFixed(2)}
          </Text>
        </Text>
        <Button
          color={Colors.primaryColor}
          title="Place Order"
          onPress={() => {
            dispatch(orderActions.addOrder(cartItems, totalCartAmount));
          }}
          disabled={cartItems.length === 0}
        />
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderCartItem}
      />
    </View>
  );
};
CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};
const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.accentColor,
  },
});

export default CartScreen;
