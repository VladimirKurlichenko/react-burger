import { ApiOrderUrl } from '../../utils/constants';
import { CLEAR_CART_INGREDIENT } from './cartIngredient';

export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER_SUCCESS";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";
export const GET_ORDER_INGREDIENTS_ID = 'GET_ORDER_INGREDIENT_ID';

export const getOrderNumber = (ingredientsIDs) => {
  return function(dispatch) {
    dispatch({ type: GET_ORDER_NUMBER_REQUEST });

    fetch(ApiOrderUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"ingredients": ingredientsIDs})
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
        })
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