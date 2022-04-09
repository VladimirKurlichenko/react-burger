// export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
// export const PASSWORD_RESER_ERROR = 'PASSWORD_RESER_ERROR';

export const PASSWORD_RESET_SUCCESS: 'PASSWORD_RESET_SUCCESS' = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESER_ERROR: 'PASSWORD_RESER_ERROR' = 'PASSWORD_RESER_ERROR';


interface PasswordResetSuccess {
    readonly type: typeof PASSWORD_RESET_SUCCESS;
}
interface PasswordResrtError {
    readonly type: typeof PASSWORD_RESER_ERROR;
}

export type TPassword = PasswordResetSuccess | PasswordResrtError;

