import PropTypes from 'prop-types';
import style from './IngredientDetails.module.css';
import Modal from '../Modal/Modal';
import {itemsPropTypes} from '../../utils/dataPropTypes'

const IngredientDetails = ({ onClose, item }) => {

    return (
        <Modal onClose={onClose}>
            <div className={`${style.cardIngredient} pt-10 pb-10`}>
                <h3 className={`${style.headerModal} ml-15 mt-5 text text_type_main-large`}>Детали ингредиента</h3>
                <img className={`${style.mainImage} mt-10`} src={item.image_large} alt={item.name} />
                <p className={`${style.name} pt-4 pb-6 text text_type_main-medium`}>
                    {item.name}
                </p>
                <ul className={style.info}>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{item.calories}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{item.proteins}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{item.fat}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{item.carbohydrates}</p>
                    </li>

                </ul>
            </div>
        </Modal>
    )
};

IngredientDetails.propTypes = {
    onClose: PropTypes.func.isRequired,
    
    item: itemsPropTypes
}; 

export default IngredientDetails;