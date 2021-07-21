import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <View style={styles.quickAddRemove}>
          <TouchableOpacity onPress={props.onIncrement}>
            <Ionicons name="chevron-up-outline" size={14} />
          </TouchableOpacity>
          <TouchableOpacity onPress={props.onDecrement}>
            <Ionicons name="chevron-down-outline" size={14} />
          </TouchableOpacity>
        </View>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainText}> {props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${Math.abs(props.price).toFixed(2)}</Text>
        <TouchableOpacity
          onPress={props.onDeleteItem}
          style={styles.deleteButton}
        >
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
  quickAddRemove: {
    marginHorizontal: 4,
  },
  itemData: {
    // justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: 'open-sans',
    color: '#888',
    fontSize: 16,
  },
  mainText: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20, // spacing between item and text.
  },
});

export default CartItem;
