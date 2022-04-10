import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE, WS_CONNECTION_START_USER } from "../actions/socket";
import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch, RootState} from '../reducers/index'
import {getCookie} from '../../utils/cookies'
import { WS_USER_ORDERS_URL } from '../../utils/api-urls';
interface IAction {
    type: string;
    payload: {};
    wsUrl?: string;
}

export type TWsActions = {
    readonly wsFeedStart: typeof WS_CONNECTION_START;
    readonly wsFeedStartUser: typeof WS_CONNECTION_START_USER;
    readonly onFeedSuccess: typeof WS_CONNECTION_SUCCESS;
    readonly onFeedClose: typeof WS_CONNECTION_CLOSED;
    readonly onFeedError: typeof WS_CONNECTION_ERROR;
    readonly onFeedGetMessage: typeof WS_GET_MESSAGE;
    readonly onFeedSendMessage: typeof WS_SEND_MESSAGE;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let accessToken: string | undefined = undefined;

        return (next) => (action: IAction) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsFeedStart, onFeedSuccess, onFeedError, onFeedGetMessage, onFeedClose, onFeedSendMessage , wsFeedStartUser} = wsActions;

            if (type === wsFeedStart && action.wsUrl !== undefined) {
                socket = new WebSocket(action.wsUrl);
            }

            switch (type) {

                case wsFeedStartUser:
                    accessToken = getCookie('accessToken'); 
                    console.log("work switch user", accessToken)
                    if (accessToken) {
                        socket = new WebSocket(`${WS_USER_ORDERS_URL}?token=${accessToken}`);   
                    }
                    break;


                }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onFeedSuccess, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: onFeedError, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    dispatch({ type: onFeedGetMessage, payload: data });
                };

                socket.onclose = event => {
                    dispatch({ type: onFeedClose, payload: event });
                };

                if (type === onFeedSendMessage) {
                    const message = payload;
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    })
};


