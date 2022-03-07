import { SET_ACTIVE_INGREDIENT } from '../actions/ingredientDetails';

const initialState = {
    activeIngredient: {},
}

export const ingredientDetailsReducer = (state = initialState, { type, activeIngredient }) => {
    switch (type) {
      case SET_ACTIVE_INGREDIENT: {
        return {
          ...state,
          activeIngredient: activeIngredient
        }
      }
      default: {
        return state;
      }
    }
  }