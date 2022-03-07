import { GET_INGREDIENTS_URL } from "../../utils/api-urls";
import { checkResponse } from '../../utils/helpers';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const getIngredients = () => {
    return function(dispatch) {
      dispatch({ type: GET_INGREDIENTS_REQUEST });
      
      fetch(GET_INGREDIENTS_URL)
        .then(res => checkResponse(res))
        .then(res => dispatch({ type: GET_INGREDIENTS_SUCCESS, payload: res.data }))
        .catch(e => {
          dispatch({
            type: GET_INGREDIENTS_ERROR
          });
          console.log(e);
        });
    }
  }; 