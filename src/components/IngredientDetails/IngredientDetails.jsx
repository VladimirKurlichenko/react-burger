import PropTypes from 'prop-types';
import './IngredientDetails.css';
import Modal from '../Modal/Modal';

const IngredientDetails = ({ onClose, item }) => {

    return (
        <Modal onClose={onClose}>
            <div className={"cardIngredient pt-10 pb-10"}>
                <h3 className={"headerModal ml-15 mt-5 text text_type_main-large"}>Детали ингредиента</h3>
                <img className={"mainImage mt-10"} src={item.image_large} alt={item.name} />
                <p className="name pt-4 pb-6 text text_type_main-medium">
                    {item.name}
                </p>
                <ul className="info">
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
   }).isRequired
}; 

export default IngredientDetails;