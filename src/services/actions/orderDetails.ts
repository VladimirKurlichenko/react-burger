import { POST_ORDER_URL } from '../../utils/api-urls';
import { CLEAR_CART_INGREDIENT } from './cartIngredient';
import { checkResponse } from '../../utils/helpers';
import { TIngredientsIDs } from '../../types/types';
import { Dispatch } from 'redux';
export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const GET_ORDER_INGREDIENTS_ID = 'GET_ORDER_INGREDIENT_ID';

export const getOrderNumber = (ingredientsIDs: TIngredientsIDs) => {
  return function(dispatch: Dispatch) {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });

    fetch(POST_ORDER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"ingredients": ingredientsIDs})
    }).then(res => checkResponse(res))
        .then(res => {
          dispatch({ type: GET_ORDER_NUMBER_SUCCESS, orderNumber: res.order.number });
          dispatch({ type: CLEAR_CART_INGREDIENT })
        })
        .catch(e => {
          dispatch({ type: GET_ORDER_NUMBER_FAILED })
          console.log(e);
        });
    }
};