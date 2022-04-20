import {ADD_CART_INGREDIENT, DELETE_CART_INGREDIENT, ADD_CART_INGREDIENT_BUN, MOVE_CART_INGREDIENT, CLEAR_CART_INGREDIENT, TCartActions} from "../actions/cartIngredient"
import update from 'immutability-helper';  
import type { TIngredient } from '../../types/types';

interface IState {
  readonly сartIngredients: ReadonlyArray<TIngredient>;
  readonly bunIngredients: ReadonlyArray<TIngredient>;
}

const initialState : IState = {
    сartIngredients: [],
    bunIngredients: []
}



export const cartIngredientReducer = (state = initialState, action : TCartActions) => {
    switch (action.type) {
      case ADD_CART_INGREDIENT: {
        return {
          ...state,
                  сartIngredients: [...state.сartIngredients, action.ingredients]
        };
      }
      case ADD_CART_INGREDIENT_BUN: {
        return {
          ...state,
          bunIngredients: [action.ingredients]
        };
      }
      case DELETE_CART_INGREDIENT: {
        return {
          ...state,
          сartIngredients: state.сartIngredients.filter((item, index) => index !== action.ingredients)
        };
      }
      case MOVE_CART_INGREDIENT: {
        return {
          ...state,
          сartIngredients: update(state.сartIngredients, {
            $splice: [
              [action.ingredient.index, 1],
              [action.dropIndex, 0, action.ingredient.item],
            ] as any,
          })
        };
      }
      case CLEAR_CART_INGREDIENT: {
        return {
          сartIngredients: [],
          bunIngredients: []
        }
      }
      default: {
        return state;
      }
    }
  }