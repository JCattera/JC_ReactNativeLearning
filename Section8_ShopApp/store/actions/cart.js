export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART_ITEM = 'CLEAR_CART_ITEM';

export const addToCart = (product) => {
  return { type: ADD_TO_CART, addedProduct: product };
};

export const removeFromCart = (id) => {
  return { type: REMOVE_FROM_CART, itemId: id };
};

export const clearCartItem = (id) => {
  return { type: CLEAR_CART_ITEM, itemId: id };
};
