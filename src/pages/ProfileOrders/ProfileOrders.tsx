import style from './ProfileOrders.module.css';
import { useState, useCallback, useEffect } from 'react';
import { useHistory, useLocation, Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from '../../types/hooks';
import { logout } from '../../services/actions/auth';
import { WS_USER_ORDERS_URL } from '../../utils/api-urls';

import OrderElement from '../../components/OrderElement/OrderElement';
import { RootState } from '../../services/reducers';
import { TOrder } from '../../types/types';
import { VISIBLE_ORDERS_DETAILS } from '../../services/actions/modals';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/socket';

export default function ProfileOrders() {
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    const messages = useSelector((store) => store.ws.messages);
    const [orders, setOrders] = useState<Array<TOrder>>([]);

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, wsUrl: WS_USER_ORDERS_URL })
        return () => {dispatch({ type: WS_CONNECTION_CLOSED })}
    }, [dispatch])

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (!lastMessage) return;

        const parsedMessage = JSON.parse(String(lastMessage));
        setOrders(() => parsedMessage.orders);

        console.log(parsedMessage.orders);
    }, [messages]);

    const onClick = (order: TOrder) => {
        history.replace({ pathname: `/profile/orders/${order.number}`, state: { background: location, order: order } })
        dispatch({ type: VISIBLE_ORDERS_DETAILS, value: true })
    }

    const onClickLogout = useCallback((e) => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <div className={style.main}>
            <div className={style.left}>

                <nav className={style.nav}>
                    <NavLink
                        exact to={{ pathname: '/profile' }}
                        activeClassName={style.activeLink}
                        className={`text text_type_main-medium text-color-inactive ${style.navChild}`}>
                        Профиль
                    </NavLink>

                    <NavLink
                        exact to={{ pathname: '/profile/orders' }}
                        activeClassName={style.activeLink}
                        className={`text text_type_main-medium text-color-inactive ${style.navChild}`}>
                        История заказов
                    </NavLink>

                    <Link
                        onClick={onClickLogout}
                        to={{ pathname: '/' }}
                        className={`text text_type_main-medium text-color-inactive ${style.navChild}`}>
                        Выход
                    </Link>

                    <p className={`text text_type_main-small text_color_inactive ${style.navParagraph}`}>В этом разделе вы можете изменить свои персональные данные</p>
                </nav>
            </div>

            <div className={style.right}>
                {orders
                    ? (
                        orders.slice(0).reverse().map((order, index) => {
                            return (
                                <OrderElement
                                    key={index}
                                    onClick={() => onClick(order)}
                                    order={order}
                                    from='profile'
                                />
                            )
                        })
                    )
                    :
                    null
                }
            </div>

        </div>
    )
}