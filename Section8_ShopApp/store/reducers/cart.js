import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART_ITEM,
} from '../actions/cart';
import CartItem from '../../models/cart-item';
const initialState = {
  cartItems: {},
  totalCartAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.addedProduct;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      let newItem;
      if (state.cartItems[addedProduct.id]) {
        newItem = new CartItem(
          state.cartItems[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.cartItems[addedProduct.id].sumTotal + productPrice
        );
      } else {
        newItem = new CartItem(1, productPrice, productTitle, productPrice);
      }
      return {
        ...state,
        cartItems: { ...state.cartItems, [addedProduct.id]: newItem },
        totalCartAmount: state.totalCartAmount + productPrice,
      };

    case CLEAR_CART_ITEM:
      const currentCartItems = { ...state.cartItems };
      if (state.cartItems[action.id]) {
        priceSubtracted = state.cartItems[action.id].sumTotal;
        delete currentCartItems[action.id];
        return {
          ...state,
          cartItems: currentCartItems,
          totalCartAmount: state.totalCartAmount - priceSubtracted,
        };
      } else {
        return state;
      }
    // case REMOVE_FROM_CART:
    //   const currentCartItems = { ...state.cartItems };
    //   const priceSubtracted = state.cartItems[action.id].price;
    //   return state;
  }
  return state;
};
