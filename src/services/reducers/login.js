import {
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from "../actions/login"

const initialState = {
    isLogin: false,
}

export const forgotPasswordReducer = (state = initialState, { type }) => {
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