import thunk from 'redux-thunk';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { ingredientsReducer } from './ingredients';
import { modalsReducer } from './modals';
import { ingredientDetailsReducer } from './ingredientDetails';
import { cartIngredientReducer } from './cartIngredient';
import {orderDetailsReducer } from './orderDetails'
import { forgotPasswordReducer } from './forgotPassword';
import { userReducer } from './user';
import { composeWithDevTools } from 'redux-devtools-extension';

import { TCartActions } from '../actions/cartIngredient';
import { TForgotPasswordActions } from '../actions/forgotPassword';
import { TIngredientsActions } from '../actions/ingredients';
import { TIngredientDetailsActions } from '../actions/ingredientDetails';
import { TModalsActions } from '../actions/modals';
import { TOrderDetailsActions } from '../actions/orderDetails';
import { TUser } from '../actions/user';
import { TLoginActions, TPasswordActions,TUserDataActions,TRegisterActions, TLogoutActions} from '../actions/auth';
import { TLogin } from '../actions/login';
import { socketMiddleware } from '../middlewares/socketMiddleware';
import { TSocketActions } from '../actions/socket';
import { wsReducer } from './socket';
import {TWsActions} from '../middlewares/socketMiddleware'
import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_CONNECTION_START_USER} from "../actions/socket";

export const wsFeedActions: TWsActions = {
  wsFeedStart: WS_CONNECTION_START,
  wsFeedStartUser: WS_CONNECTION_START_USER,
  onFeedSuccess: WS_CONNECTION_SUCCESS,
  onFeedError: WS_CONNECTION_ERROR,
  onFeedGetMessage: WS_GET_MESSAGE,
  onFeedClose: WS_CONNECTION_CLOSED,
  onFeedSendMessage: WS_SEND_MESSAGE
};

const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsFeedActions)));

const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    ingredientDetails: ingredientDetailsReducer,
    modals: modalsReducer,
    cartIngredient: cartIngredientReducer,
    orderDetails: orderDetailsReducer,
    forgotPassword: forgotPasswordReducer,
    user: userReducer,
    ws: wsReducer,
})

export const store = createStore(rootReducer, enhancer);
export type RootState = ReturnType<typeof rootReducer>

// Типизация всех экшенов приложения
type TApplicationActions = 
  TCartActions | 
  TForgotPasswordActions | 
  TIngredientsActions |
  TIngredientDetailsActions |
  TModalsActions |
  TOrderDetailsActions |
  TLoginActions |
  TPasswordActions |
  TUserDataActions |
  TRegisterActions |
  TLogoutActions |
  TSocketActions |
  TUser;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = Dispatch<TApplicationActions>