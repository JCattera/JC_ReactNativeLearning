import {
  ADD_TO_CART,
  CLEAR_CART_ITEM,
  CHANGE_CART_ITEM_QUANTITY,
} from '../actions/cart';
import { DELETE_PRODUCT } from '../actions/products';
import CartItem from '../../models/cart-item';
import { ADD_ORDER } from '../actions/order';
const initialState = {
  cartItems: {},
  totalCartAmount: 0,
};

export default (state = initialState, action) => {
  const deleteHandler = (state, action) => {
    const currentCartItems = { ...state.cartItems };
    const priceSubtracted = currentCartItems[action.itemId].sumTotal;
    delete currentCartItems[action.itemId];
    return {
      ...state,
      cartItems: currentCartItems,
      totalCartAmount: state.totalCartAmount - priceSubtracted,
    };
  };
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
      return deleteHandler(state, action);
    case DELETE_PRODUCT:
      if (!state.cartItems[action.itemId]) {
        return state;
      }
      return deleteHandler(state, action);
    case ADD_ORDER:
      return initialState;
    case CHANGE_CART_ITEM_QUANTITY:
      const selectedItem = state.cartItems[action.itemId];
      const currentQty = selectedItem.quantity;
      const increment = action.increment;
      let updatedItems;
      if (currentQty > 1 || increment) {
        const updatedItem = new CartItem(
          currentQty + (increment ? 1 : -1),
          selectedItem.productPrice,
          selectedItem.productTitle,
          selectedItem.sumTotal +
            (increment ? 1 : -1) * selectedItem.productPrice
        );
        updatedItems = { ...state.cartItems, [action.itemId]: updatedItem };
      } else {
        updatedItems = { ...state.cartItems };
        delete updatedItems[action.itemId];
      }
      return {
        ...state,
        cartItems: updatedItems,
        totalCartAmount: Math.abs(
          state.totalCartAmount +
            (increment ? 1 : -1) * selectedItem.productPrice
        ),
      };
  }
  return state;
};
