import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
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
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:
          <Text style={styles.amount}> ${totalCartAmount.toFixed(2)}</Text>
        </Text>
        <Button
          color={Colors.primaryColor}
          title="Place Order"
          onPress={() => {
            console.log(cartItems);
          }}
          disabled={cartItems.length === 0}
        />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => item.id}
        renderItem={renderCartItem}
        style={{ width: '100%' }}
      />
    </View>
  );
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
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
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
