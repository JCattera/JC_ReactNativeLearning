import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';

import CartItem from './CartItem';

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={Colors.primaryColor}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.itemDetails}>
          {props.items.map((itemData) => (
            <CartItem
              key={itemData.id}
              quantity={itemData.quantity}
              price={itemData.productPrice}
              title={itemData.productTitle}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: 'black',
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
    margin: 20,
    padding: 10,
    alignItems: 'center',
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16,
  },
  date: { fontFamily: 'open-sans', color: '#888', fontSize: 16 },
  itemDetails: { width: '100%' },
});
export default OrderItem;
