import {
  SET_PRODUCTS,
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  GET_NEW_PRODUCTS,
  SET_TO_CATALOG,
  SET_CATALOG_PRODUCTS_QUANTITY,
  CLEAN_CATALOG_PRODUCTS,
  SET_SEARCH_PRODUCTS,
  CLEAR_SEARCH_PRODUCTS,
  SET_MIN_MAX_PRICE,
  STOP_LOADING,
  START_LOADING
} from './actionType';

export const MODULE_NAME = 'products'

export const selectMinMaxPrice = (state) => state[MODULE_NAME].catalog.minMaxPrice
export const selectIsLoading = (state) => state[MODULE_NAME].catalog.isLoading
export const selectCatalogProducts = (state) => state[MODULE_NAME].catalog.catalogProducts
export const selectProductsQuantity = (state) => state[MODULE_NAME].catalog.productsQuantity

const initialState = {
  products: [],
  catalog: {
    catalogProducts: [],
    isLoading: false,
    productsQuantity: 0,
    minMaxPrice: []
  },
  searchProducts: [],
  newProducts: [],
  pageProduct: {}
}

export const reducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case START_LOADING:
    case STOP_LOADING:
      return {
        ...state,
        catalog: {
          ...state.catalog,
          isLoading: !state.catalog.isLoading
        }
      }
    case SET_PRODUCTS:
      return {
        ...state,
        products: payload
      }

    case ADD_PRODUCT:
      return {
        ...state,
        products: [payload, ...state.products]
      }

    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((el) => (+el.itemNo !== +payload.itemNo ? el : payload))
      }
      
    case GET_NEW_PRODUCTS:
      return {
        ...state,
        newProducts: payload
      }
    case SET_TO_CATALOG:
      return {
        ...state,
        catalog: {
          ...state.catalog,
          catalogProducts: payload
        }
      }
    case SET_CATALOG_PRODUCTS_QUANTITY:
      return {
        ...state,
        catalog: {
          ...state.catalog,
          productsQuantity: state.catalog.catalogProducts.length ? payload : 0
        }
      }
    case CLEAN_CATALOG_PRODUCTS:
      return {
        ...state,
        catalog: {
          ...state.catalog,
          catalogProducts: []
        }
      }
    case SET_SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: [...payload]
      }
    case CLEAR_SEARCH_PRODUCTS:
      return {
        ...state,
        searchProducts: []
      }
    case SET_MIN_MAX_PRICE:
      return {
        ...state,
        catalog: {
          ...state.catalog,
          minMaxPrice: payload
        }
      }
    default:
      return state
  }
}

export default reducer