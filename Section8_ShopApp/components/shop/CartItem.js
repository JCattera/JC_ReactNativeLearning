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
      <View>
        <Text>
          <Text>{props.quantity}</Text>
          <Text>{props.title}</Text>
        </Text>
      </View>
      <View>
        <Text>${props.price.toFixed(2)}</Text>
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
    justifyContent: 'space-around',
  },
});

export default CartItem;
