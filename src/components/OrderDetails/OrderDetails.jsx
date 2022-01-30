import React from 'react';
import style from './OrderDetails.module.css';
import PropTypes from 'prop-types';
import Modal from '../Modal/Modal';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const OrderDetails = ({ onClose, orderNum }) => {

    return (
        <Modal onClose={onClose}>
            <div className={`${style.card} pt-10 pb-10`}>
                <h3 className={`${style.order} pt-3 text text_type_digits-large`}>{orderNum}</h3>
                <p className='text text_type_main-medium pt-1'>идентификатор заказа</p>
                <span className={style.icon}><CheckMarkIcon /></span>
                <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
                <p className='text text_type_main-default text_color_inactive pb-10 pt-2'>Дождитесь готовности на орбитальной станции</p>
            </div>
        </Modal>
    )
};

OrderDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    orderNum: PropTypes.string.isRequired
};

export default OrderDetails;