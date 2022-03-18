import thunk from 'redux-thunk';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalsReducer } from './modals';
import { ingredientDetailsReducer } from './ingredientDetails';
import { cartIngredientReducer } from './cartIngredient';
import {orderDetailsReducer } from './orderDetails'
import { forgotPasswordReducer } from './forgotPassword';
import { resetPasswordReducer } from './resetPassword';
import { userReducer } from './user';
import { composeWithDevTools } from 'redux-devtools-extension';


const enhancer = composeWithDevTools(applyMiddleware( thunk ));

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    modals: modalsReducer,
    cartIngredient: cartIngredientReducer,
    orderDetails: orderDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    user: userReducer
})

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof rootReducer>