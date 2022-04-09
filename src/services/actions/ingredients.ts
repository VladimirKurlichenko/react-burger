import { GET_INGREDIENTS_URL } from "../../utils/api-urls";
import { checkResponse } from '../../utils/helpers';
import { TIngredient } from '../../types/types';
import { AppDispatch, AppThunk } from '../reducers';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsRequestSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: ReadonlyArray<TIngredient>;
}

export interface IGetIngredientsRequestError {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export type TIngredientsActions = IGetIngredientsRequest | IGetIngredientsRequestSuccess | IGetIngredientsRequestError;

export const getIngredients: AppThunk = () => {
    return function(dispatch : AppDispatch) {
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