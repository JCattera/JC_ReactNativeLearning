export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART_ITEM = 'CLEAR_CART_ITEM';
export const CHANGE_CART_ITEM_QUANTITY = 'CHANGE_CART_ITEM_QUANTITY';
export const addToCart = (product) => {
  return { type: ADD_TO_CART, addedProduct: product };
};

export const clearCartItem = (id) => {
  return { type: CLEAR_CART_ITEM, itemId: id };
};

export const changeCartItemQuantity = (id, inc) => {
  return { type: CHANGE_CART_ITEM_QUANTITY, itemId: id, increment: inc };
};
