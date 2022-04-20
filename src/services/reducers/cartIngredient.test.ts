import {
    ADD_CART_INGREDIENT,
    DELETE_CART_INGREDIENT,
    MOVE_CART_INGREDIENT,
    CLEAR_CART_INGREDIENT,
    addCartIngredientBun,
    ADD_CART_INGREDIENT_BUN
} from '../actions/cartIngredient';
import { cartIngredientReducer as reducer } from './cartIngredient'
import { ingredientTestExample, ingredientBunTestExample } from '../../utils/tests-data'
import update from 'immutability-helper';


describe('', () => {
    const initialState = {
        сartIngredients: [],
        bunIngredients: []
    }

    it('should return initial state', () => {
        expect(reducer(undefined, {} as any)).toEqual(initialState)
    })

    it('should add an ingredient to the cart', () => {
        expect(reducer(initialState, {
            type: ADD_CART_INGREDIENT,
            ingredients: ingredientTestExample
        })).toEqual({
            ...initialState,
            сartIngredients: [...initialState.сartIngredients, ingredientTestExample]
        })
    })

    it('should add an ingredient bun to the cart', () => {
        expect(reducer(initialState, {
            type: ADD_CART_INGREDIENT_BUN,
            ingredients: ingredientBunTestExample
        })).toEqual({
            ...initialState,
            bunIngredients: [...initialState.bunIngredients, ingredientBunTestExample]
        })
    })

    it('should delete an ingredient from the cart', () => {
        const prevState = {
            сartIngredients: [ingredientTestExample],
            bunIngredients: [],
        }
        const ingredientIndex = 0;
        expect(reducer(prevState, {
            type: DELETE_CART_INGREDIENT,
            ingredients: 0
        })).toEqual({
            ...initialState,
            сartIngredients: prevState.сartIngredients.filter((_, index) => index !== ingredientIndex)
        })
    })

    it('should move an ingredient in the cart', () => {
        const prevState = {
            сartIngredients: [ingredientTestExample, ingredientTestExample],
            bunIngredients: [],
        }
        const ingredient = {
            item: ingredientTestExample, 
            index: 1
        }
        const dropIndex = 0;
        expect(reducer(prevState, {
            type: MOVE_CART_INGREDIENT,
            ingredient: ingredient,
            dropIndex: dropIndex
        })).toEqual({
            ...initialState,
            сartIngredients: update(prevState.сartIngredients, {
                $splice: [
                  [ingredient.index, 1],
                  [dropIndex, 0, ingredient.item],
                ]
              })
        })
    })

    it('should clear the cart', () => {
        const prevState = {
            сartIngredients: [ingredientTestExample],
            bunIngredients: [ingredientBunTestExample],
        }
        expect(reducer(prevState, {type: CLEAR_CART_INGREDIENT})).toEqual({...initialState})
    })
})