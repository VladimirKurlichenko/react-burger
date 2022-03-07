import {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESER_ERROR
} from "../actions/resetPassword"

const initialState = {
    isPasswordForgotten: false,
}

export const resetPasswordReducer = (state = initialState, { type }) => {
    switch (type) {
      case PASSWORD_RESET_SUCCESS: {
        return {
          isPasswordForgotten: true
        }
      }
      case PASSWORD_RESER_ERROR: {
        return {
          isPasswordForgotten: false
        }
      }
      default: {
        return state;
      }
    }
  }