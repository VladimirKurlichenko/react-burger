import React from 'react';
import style from './Card.module.css';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../IngredientDetails/IngredientDetails';
import {itemsPropTypes} from '../../../utils/dataPropTypes'


const Card = ({item}) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const handleModalIsOpen = () => { setModalIsOpen(true) };
  const handleModalIsClose = () => { setModalIsOpen(false) };

  return (
    <>
      <div className={`${style.cardItem} mb-3`} key={item._id}  onClick={handleModalIsOpen}>
        < Counter count={1} size="default" />
        <img src={item.image} alt="" />
        <div className={`${style.priceCard} mb-2`}>
            <p className="text text_type_main-default mr-2">{item.price}</p>
            <CurrencyIcon type="primary" />
        </div>
        <p className="text text_type_main-default">{item.name}</p>
      </div>
      {modalIsOpen && (
                <IngredientDetails onClose={handleModalIsClose} item={item} />
      )}
    </>

  );
}

Card.propTypes = itemsPropTypes;  
    
export default Card;
