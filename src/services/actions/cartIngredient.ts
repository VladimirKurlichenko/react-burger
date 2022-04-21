import { TIngredient } from "../../types/types";
import { TBun } from "../../types/types";

export const ADD_CART_INGREDIENT = 'ADD_CART_INGREDIENT';
export const DELETE_CART_INGREDIENT = 'DELETE_CART_INGREDIENT';
export const ADD_CART_INGREDIENT_BUN = 'ADD_CART_INGREDIENT_BUN';
export const MOVE_CART_INGREDIENT = 'MOVE_CART_INGREDIENT';
export const CLEAR_CART_INGREDIENT = 'CLEAR_CART_INGREDIENT';

export interface IAddCartIngredient {
    readonly type: typeof ADD_CART_INGREDIENT;
    readonly ingredients: TIngredient;
}

export interface IAddCartIngredientBun {
    readonly type: typeof ADD_CART_INGREDIENT_BUN;
    readonly ingredients: TIngredient;
}

export interface IDeleteCartIngredient {
    readonly type: typeof DELETE_CART_INGREDIENT;
    readonly ingredients: number;
}

export interface IMoveCartIngredient {
    readonly type: typeof MOVE_CART_INGREDIENT;
    readonly ingredients: { item?: {}, index?: number };
    readonly dropIndex: number;
}

export interface IClearCartIngredient {
    readonly type: typeof CLEAR_CART_INGREDIENT;
}

export type TCartActions = 
    IAddCartIngredient |
    IAddCartIngredientBun |
    IDeleteCartIngredient |
    IMoveCartIngredient |
    IClearCartIngredient;

export const addCartIngredientBun = (ingredient: TBun) => ({
        type: ADD_CART_INGREDIENT_BUN, 
        ingredient: ingredient    
    })