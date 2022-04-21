import { ingredientDetailsReducer as reducer } from "./ingredientDetails"
import {
    SET_ACTIVE_INGREDIENT, TIngredientDetailsActions
  } from '../actions/ingredientDetails'
  import { ingredientTestExample, ingredientBunTestExample } from '../../utils/tests-data'
  import type { TIngredient } from '../../types/types';

  interface IState {
    readonly activeIngredient: TIngredient | null;
  }

describe('', () => {
    const initialState: IState = {
        activeIngredient: null,
      }

      it('should return active ingredient', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState)
    })

    it('should set visible order details modal', () => {
        expect(reducer(initialState, {
            type: SET_ACTIVE_INGREDIENT,
            activeIngredient: ingredientTestExample
        })).toEqual({
            ...initialState,
            activeIngredient: ingredientTestExample
        })
    })
})