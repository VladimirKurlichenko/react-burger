import {
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESER_ERROR,
    TPassword
} from "../actions/resetPassword"

interface IState {
  readonly isPasswordForgotten: boolean;
}


const initialState: IState = {
    isPasswordForgotten: false,
}

export const resetPasswordReducer = (state = initialState, { type }: TPassword) => {
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