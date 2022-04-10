import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  VISIBLE_ORDER_DETAILS,
  VISIBLE_ORDERS_DETAILS,
  VISIBLE_INGREDIENT_DETAILS,
  TModalsActions
} from '../actions/modals';


interface IState {
  readonly visibleOrderDetails: boolean;
  readonly visibleOrdersDetails: boolean;
  readonly visibleIngredientDetails: boolean;
}


const initialState: IState = {
  visibleOrderDetails: false,
  visibleOrdersDetails: false,
  visibleIngredientDetails: false
}

export const modalsReducer = (state = initialState, action: TModalsActions): IState => {
  console.log(action.type)
  switch (action.type) {
    case VISIBLE_ORDER_DETAILS: {
      console.log("VISIBLE_ORDER_DETAILS - work")
      return {
        ...state,
        visibleOrderDetails: action.value
      }
    }
    case VISIBLE_INGREDIENT_DETAILS: {
      return {
        ...state,
        visibleIngredientDetails: action.value
      }
    }
    case VISIBLE_ORDERS_DETAILS: {
      console.log("VISIBLE_ORDERS_DETAILS - work")
      return {
        ...state,
        visibleOrdersDetails: action.value
      }
    }
    default: {
      return state;
    }
  }
}