import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
const initialState = {
  cartItems: {},
  totalItems: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.addedProduct;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      if (state.cartItems[addedProduct.id]) {
        const currentItem = state.cartItems[addedProduct.id];
        const newItem = CartItem(
          currentItem.quantity + 1,
          productPrice,
          productTitle,
          currentItem.sumTotal + productPrice
        );
      } else {
      }
    }
  }
  return state;
};
