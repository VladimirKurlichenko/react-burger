import { modalsReducer as reducer } from "./modals"
import {
    VISIBLE_ORDER_DETAILS,
    VISIBLE_INGREDIENT_DETAILS,
    VISIBLE_ORDERS_DETAILS,
  } from '../actions/modals'

describe('order details reducer', () => {
    const initialState = {
        visibleOrderDetails: false,
        visibleIngredientDetails: false,
        visibleOrdersDetails: false
      }

      it('should return initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState)
    })

    it('should set visible order details modal', () => {
        expect(reducer(initialState, {
            type: VISIBLE_ORDER_DETAILS,
            value: true,
        })).toEqual({
            ...initialState,
            visibleOrderDetails: true,
        })
    })
    it('should set hidden order details modal', () => {
        expect(reducer(initialState, {
            type: VISIBLE_ORDER_DETAILS,
            value: false,
        })).toEqual({
            ...initialState,
            visibleOrderDetails: false,
        })
    })

    it('should set visible order details modal', () => {
        expect(reducer(initialState, {
            type: VISIBLE_INGREDIENT_DETAILS,
            value: true,
        })).toEqual({
            ...initialState,
            visibleIngredientDetails: true,
        })
    })
    it('should set hidden order details modal', () => {
        expect(reducer(initialState, {
            type: VISIBLE_INGREDIENT_DETAILS,
            value: false,
        })).toEqual({
            ...initialState,
            visibleIngredientDetails: false,
        })
    })

    it('should set visible orders modal', () => {
        expect(reducer(initialState, {
            type: VISIBLE_ORDERS_DETAILS,
            value: true,
        })).toEqual({
            ...initialState,
            visibleOrdersDetails: true,
        })
    })
    it('should set hidden orders modal', () => {
        expect(reducer(initialState, {
            type: VISIBLE_ORDERS_DETAILS,
            value: false,
        })).toEqual({
            ...initialState,
            visibleOrdersDetails: false,
        })
    })
})