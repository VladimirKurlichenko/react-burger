import React, {useEffect} from 'react';
import style from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../types/hooks';
import { RESET_ORDER_NUMBER } from '../../services/actions/orderDetails';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { orderNumber } = useSelector((store) => store.orderDetails);

    useEffect(() => {
        dispatch({ type: RESET_ORDER_NUMBER });
    }, [dispatch])

    return (
        !orderNumber
                ? ( <div className={`${style.card} pt-10 pb-10`}>
                <p className='text text_type_main-medium pt-1'>Заказ формируется</p>
            </div>)
        :(
            <div className={`${style.card} pt-10 pb-10`}>
                <h3 className={`${style.order} pt-3 text text_type_digits-large`}>{orderNumber}</h3>
                <p className='text text_type_main-medium pt-1'>идентификатор заказа</p>
                <span className={style.icon}><CheckMarkIcon type='primary' /></span>
                <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive pb-10 pt-2'>Дождитесь готовности на орбитальной станции</p>
            </div>
            )
    )
};

export default OrderDetails;