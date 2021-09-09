export const ADD_ORDER = 'ADD_ORDER';
export const GET_ORDERS = 'GET_ORDERS';
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
// export const fetchOrders = () => {
//   return async (dispatch) => {
//     const response = await fetch(
//       'https://rn-complete-guide-f0816-default-rtdb.firebaseio.com/orders.json'
//     );
//     if (!response.ok) {
//       throw new Error('Something bad happened!');
//     }
//     const resData = await response.json();
//     const loadedOrders = Object.entries(resData).map()
//   }
// }
