import React, {useEffect} from 'react';
import style from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderNumber } from '../../services/actions/orderDetails';

const OrderDetails = () => {
    const dispatch = useDispatch();
    const { ingredientsIDs, orderNumber } = useSelector(state => state.orderDetails);

    useEffect(() => {
        dispatch(getOrderNumber(ingredientsIDs));
    }, [dispatch, ingredientsIDs])

    return (
            <div className={`${style.card} pt-10 pb-10`}>
                <h3 className={`${style.order} pt-3 text text_type_digits-large`}>{orderNumber}</h3>
                <p className='text text_type_main-medium pt-1'>идентификатор заказа</p>
                <span className={style.icon}><CheckMarkIcon /></span>
                <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive pb-10 pt-2'>Дождитесь готовности на орбитальной станции</p>
            </div>
    )
};

export default OrderDetails;