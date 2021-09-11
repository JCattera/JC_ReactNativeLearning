export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';
import Order from '../../models/order';

export const addOrder = (cartItems, totalCartAmount) => {
  return async (dispatch) => {
    const date = new Date();
    try {
      const response = await fetch(
        'https://rn-complete-guide-f0816-default-rtdb.firebaseio.com/orders/u1.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartItems,
            totalCartAmount,
            date: date.toISOString(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Something bad happened!');
      }
      const resData = await response.json();
      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalCartAmount,
          date: date,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};
export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://rn-complete-guide-f0816-default-rtdb.firebaseio.com/orders.json'
      );
      if (!response.ok) {
        throw new Error('Something bad happened!');
      }
      const resData = await response.json();
      const loadedOrders = Object.entries(resData).map(
        (x) =>
          new Order(
            x[0],
            x[1].cartItems,
            x[1].totalCartAmount,
            new Date(x[1].date)
          )
      );

      dispatch({ type: SET_ORDERS, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};
