import { checkResponse, fetchWithRefresh } from '../../utils/helpers';
import { setCookie, getCookie, deleteCookie } from '../../utils/cookies';
import {
    REGISTER_POST_URL, LOGIN_POST_URL, LOGOUT_POST_URL,
    GET_USER_DATA_URL, PATCH_USER_DATA_URL, PASSWORD_FORGET_POST_URL, PASSWORD_RESET_POST_URL
} from '../../utils/api-urls';
import {USER_SET_CREDENTIALS, USER_LOGOUT} from './user';
import { TFormData } from "../../types/types";
import { AppDispatch, AppThunk } from '../reducers';

// export const LOGIN_REQUEST = 'LOGIN_REQUEST';
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILED = 'LOGIN_FAILED';
// export const REGISTER_REQUEST = 'REGISTER_REQUEST';
// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// export const REGISTER_FAILED = 'REGISTER_FAILED';
// export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_FAILED = 'LOGOUT_FAILED';
// export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
// export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
// export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
// export const PATCH_USER_DATA_SUCCESS = 'PATCH_USER_DATA_SUCCESS';
// export const PATCH_USER_DATA_FAILED = 'PATCH_USER_DATA_FAILED';
// export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
// export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
// export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
// export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
// export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
// export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';
export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED';
export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';
export const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';
export const PATCH_USER_DATA_SUCCESS: 'PATCH_USER_DATA_SUCCESS' = 'PATCH_USER_DATA_SUCCESS';
export const PATCH_USER_DATA_FAILED: 'PATCH_USER_DATA_FAILED' = 'PATCH_USER_DATA_FAILED';
export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST;
}
interface IForgotPasswordRequestSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS;
}
interface IForgotPasswordRequestFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED;
}

interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST;
}
interface IResetPasswordRequestSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS;
}
interface IResetPasswordRequestFailed {
    readonly type: typeof RESET_PASSWORD_FAILED;
}

export type TPasswordActions = IForgotPasswordRequest | IForgotPasswordRequestSuccess | IForgotPasswordRequestFailed | IResetPasswordRequest | IResetPasswordRequestSuccess | IResetPasswordRequestFailed;

interface IGetUserDataRequest {
    readonly type: typeof GET_USER_DATA_REQUEST;
}
interface IGetUserDataRequestSuccess {
    readonly type: typeof GET_USER_DATA_SUCCESS;
}
interface IGetUserDataRequestFailed {
    readonly type: typeof GET_USER_DATA_FAILED;
}


interface IPatchUserDataRequestSuccess {
    readonly type: typeof PATCH_USER_DATA_SUCCESS;
}
interface IPatchUserDataRequestFailed {
    readonly type: typeof PATCH_USER_DATA_FAILED;
}

export type TUserDataActions = IGetUserDataRequest | IGetUserDataRequestSuccess | IGetUserDataRequestFailed | IPatchUserDataRequestSuccess | IPatchUserDataRequestFailed;

interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST;
}
interface ILogoutRequestSuccess {
    readonly type: typeof LOGOUT_SUCCESS;
}
interface ILogoutRequestFailed {
    readonly type: typeof LOGOUT_FAILED;
}

export type TLogoutActions = ILogoutRequest | ILogoutRequestSuccess | ILogoutRequestFailed;

interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST;
}
interface IRegisterRequestSuccess {
    readonly type: typeof REGISTER_SUCCESS;
}
interface IRegisterRequestFailed {
    readonly type: typeof REGISTER_FAILED;
}

export type TRegisterActions = IRegisterRequest | IRegisterRequestSuccess | IRegisterRequestFailed;

interface ILogin {
    readonly type: typeof LOGIN_REQUEST;
}
interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
}
interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED;
}

export type TLoginActions = ILogin | ILoginSuccess | ILoginFailed;

const otherReqOpt = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
};

export const login :AppThunk =({ email, password }: TFormData) =>
    async function (dispatch: AppDispatch) {
        dispatch({ type: LOGIN_REQUEST })

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        }

        console.log('proceed to LOGIN');
        await fetch(LOGIN_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ type: USER_SET_CREDENTIALS, user: data.user });
                dispatch({ type: LOGIN_SUCCESS });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: LOGIN_FAILED })
            });

    }

export const register: AppThunk =({ username, email, password }: TFormData) =>
    async function (dispatch: AppDispatch) {
        dispatch({ type: REGISTER_REQUEST });

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ name: username, email: email, password: password }),
            headers: { 'Content-Type': 'application/json' }
        }

        console.log('proceed to REGISTRATION');
        await fetch(REGISTER_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                setCookie('accessToken', data.accessToken.split('Bearer ')[1]);
                localStorage.setItem('refreshToken', data.refreshToken);
                dispatch({ type: USER_SET_CREDENTIALS, user: data.user });
                dispatch({ type: REGISTER_SUCCESS });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: REGISTER_FAILED })
            });
    }


    export const logout: AppThunk = () =>
    async function (dispatch: AppDispatch) {
        dispatch({ type: LOGOUT_REQUEST });

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
            headers: { 'Content-Type': 'application/json' }
        };

        console.log('proceed to LOGOUT');
        await fetch(LOGOUT_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                dispatch({ type: USER_LOGOUT });
                deleteCookie('accessToken');
                localStorage.removeItem('refreshToken');
                console.log(localStorage.getItem('refreshToken'));
                dispatch({ type: LOGOUT_SUCCESS })
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: LOGOUT_FAILED })
            }
            );
    }

export const getUserData: AppThunk = () =>
    async function (dispatch: AppDispatch) {
        dispatch({ type: GET_USER_DATA_REQUEST });

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            ...otherReqOpt
        };
        console.log(requestOptions);

        console.log('proceed to GET user info');
        await fetchWithRefresh(GET_USER_DATA_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            }
        })
            .then(data => {
                console.log(data);
                dispatch({ type: USER_SET_CREDENTIALS, user: data.user });
                dispatch({ type: GET_USER_DATA_SUCCESS });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: GET_USER_DATA_FAILED });
            })
    }

export const patchUserData : AppThunk = ({ email, username, password }: TFormData) =>
    async function (dispatch: AppDispatch) {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify({ name: username, email: email, password: password })
        }

        console.log('proceed to PATCH user info');
        await fetchWithRefresh(PATCH_USER_DATA_URL, requestOptions)
            .then(data => {
                console.log(`response is successful`)
                dispatch({ type: PATCH_USER_DATA_SUCCESS, user: data.user });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: PATCH_USER_DATA_FAILED });
            }
            );
    }

export const forgotPassword: AppThunk = ({ email }:TFormData) =>
    async function (dispatch: AppDispatch) {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email })
        };

        console.log('proceed to password forgot request');
        await fetch(PASSWORD_FORGET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
                dispatch({ type: FORGOT_PASSWORD_SUCCESS })

            })
            .catch(e => {
                console.log(e);
                dispatch({ type: FORGOT_PASSWORD_FAILED })
            })
    }

export const resetPassword: AppThunk = ({ password, token }:TFormData) =>
    async function (dispatch: AppDispatch) {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        console.log(PASSWORD_RESET_POST_URL);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: password, token: token })
        }

        console.log('proceed to password reset request');
        await fetch(PASSWORD_RESET_POST_URL, requestOptions)
            .then(res => checkResponse(res))
            .then(data => {
                console.log(data);
                dispatch({ type: RESET_PASSWORD_SUCCESS });

            })
            .catch(e => {
                console.error(e);
                dispatch({ type: RESET_PASSWORD_FAILED });
            })
    }