import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../../IngredientDetails/IngredientDetails';

const Card = ({item}) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const handleModalIsOpen = () => { setModalIsOpen(true) };
  const handleModalIsClose = () => { setModalIsOpen(false) };

  return (
    <>
      <div className='cardItem' key={item._id}  onClick={handleModalIsOpen}>
        < Counter count={1} size="default" />
        <img src={item.image} alt="" />
        <div className='priceCard'>
            <p className="text text_type_main-default">{item.price}</p>
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

Card.propTypes = {
    item: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    })
    
}

export default Card;
