// export const USER_SET_CREDENTIALS = 'USER_SET_CREDENTIALS';
// export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_SET_CREDENTIALS: 'USER_SET_CREDENTIALS' = 'USER_SET_CREDENTIALS';
export const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';


interface UserSetCredentials {
    readonly type: typeof USER_SET_CREDENTIALS;
    readonly user: {email : string,
                    name: string};
}
interface UserLogout {
    readonly type: typeof USER_LOGOUT;
}

export type TUser = UserSetCredentials | UserLogout;
