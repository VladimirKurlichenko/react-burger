import { USER_SET_CREDENTIALS, USER_LOGOUT, TUser } from '../actions/user';

interface IState {
    readonly username: string;
    readonly email: string;
  }
  

const initialState: IState = {
    username: '',
    email: ''
}

export const userReducer = (state = initialState, action: TUser) => {
    switch (action.type) {
        case USER_SET_CREDENTIALS: {
            return {
                ...state,
                email: action.user.email,
                username: action.user.name,
            }
        }
        case USER_LOGOUT: {
            return {
                ...state,
                username: '',
                email: ''
            }
        }
        default: {
            return state;
        }
    }
}