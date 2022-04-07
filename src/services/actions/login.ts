
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_ERROR: 'LOGIN_ERROR' = 'LOGIN_ERROR';


interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS;
}
interface ILoginError {
    readonly type: typeof LOGIN_ERROR;
}

export type TLogin = ILoginError | ILoginSuccess;