import { WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../actions/socket";
import { AnyAction, Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch, RootState} from '../reducers/index'
interface IAction {
    type: string;
    payload: {};
    wsUrl?: string;
}

export type TWsActions = {
    readonly wsFeedStart: typeof WS_CONNECTION_START;
    readonly onFeedSuccess: typeof WS_CONNECTION_SUCCESS;
    readonly onFeedClose: typeof WS_CONNECTION_CLOSED;
    readonly onFeedError: typeof WS_CONNECTION_ERROR;
    readonly onFeedGetMessage: typeof WS_GET_MESSAGE;
    readonly onFeedSendMessage: typeof WS_SEND_MESSAGE;
};

export const socketMiddleware = (wsActions: TWsActions): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action: IAction) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsFeedStart, onFeedSuccess, onFeedError, onFeedGetMessage, onFeedClose, onFeedSendMessage } = wsActions;

            if (type === wsFeedStart && action.wsUrl !== undefined) {
                socket = new WebSocket(action.wsUrl);
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


