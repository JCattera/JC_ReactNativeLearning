import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  SET_PRODUCTS,
} from '../actions/products';
const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PRODUCT:
      const newProduct = new Product(
        action.productData.id,
        'u1',
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case SET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.products.filter(
          (product) => product.ownerId === 'u1'
        ),
      };
    case UPDATE_PRODUCT:
      const productIndex = state.userProducts.findIndex(
        (product) => product.id === action.pid
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.pid
      );
      const updatedProduct = new Product(
        action.pid,
        state.userProducts[productIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[productIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[productIndex] = updatedProduct;
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;
      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      const userProducts = state.userProducts;
      const availableProducts = state.availableProducts;
      return {
        ...state,
        userProducts: userProducts.filter(
          (product) => product.id !== action.itemId
        ),
        availableProducts: availableProducts.filter(
          (product) => product.id !== action.itemId
        ),
      };
  }
  return state;
};
export default productsReducer;
