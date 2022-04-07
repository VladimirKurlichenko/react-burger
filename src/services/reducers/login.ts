import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    TLogin
} from "../actions/login"

interface IState {
  readonly isLogin: boolean;
}


const initialState: IState = {
    isLogin: false,
}

export const forgotPasswordReducer = (state = initialState, { type }: TLogin) => {
    switch (type) {
      case LOGIN_SUCCESS: {
        return {
            isLogin: true
        }
      }
      case LOGIN_ERROR: {
        return {
            isLogin: false
        }
      }
      default: {
        return state;
      }
    }
  }