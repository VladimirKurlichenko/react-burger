import {
    PASSWORD_FORGOT_SUCCESS,
    PASSWORD_FORGOT_ERROR
} from "../actions/forgotPassword"

const initialState = {
    isPasswordForgotten: false,
}

export const forgotPasswordReducer = (state = initialState, { type }) => {
    switch (type) {
      case PASSWORD_FORGOT_SUCCESS: {
        return {
          isPasswordForgotten: true
        }
      }
      case PASSWORD_FORGOT_ERROR: {
        return {
          isPasswordForgotten: false
        }
      }
      default: {
        return state;
      }
    }
  }