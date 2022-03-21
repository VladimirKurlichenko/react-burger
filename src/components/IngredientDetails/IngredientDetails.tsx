import style from './IngredientDetails.module.css';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { TIngredient } from '../../types/types';

const IngredientDetails = () => {

    const location = useLocation();
    const [ingredient, setIngredient] =  useState<TIngredient>();
    const ingredientID = location.pathname.split('/')[2];

    const { ingredientsData, isLoading } = useSelector((store: any) => store.ingredients);
    const activeIngredient = useSelector((store: any) => store.ingredientDetails.activeIngredient);

    useEffect(() => {
        if (Object.keys(activeIngredient).length === 0 && ingredientsData.length !== 0) {
            return setIngredient(ingredientsData.find((ing: TIngredient) => ing._id === ingredientID));
        }
        setIngredient(activeIngredient);
    }, [ingredientsData, activeIngredient, ingredientID]);

    console.log(ingredient, "ingredient")

    return (
            <div className={`${style.cardIngredient} pt-10 pb-10`}>
                <h3 className={`${style.headerModal} ml-15 mt-5 text text_type_main-large`}>Детали ингредиента</h3>
                <img className={`${style.mainImage} mt-10`} src={ingredient?.image_large} alt={ingredient?.name} />
                <p className={`${style.name} pt-4 pb-6 text text_type_main-medium`}>
                    {ingredient?.name}
                </p>
                <ul className={style.info}>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Калории, ккал</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.calories}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Белки, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.proteins}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Жиры, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.fat}</p>
                    </li>
                    <li>
                        <p className='text text_type_main-default text_color_inactive mb-2'>Углеводы, г</p>
                        <p className='text text_type_digits-default text_color_inactive'>{ingredient?.carbohydrates}</p>
                    </li>
                </ul>
            </div>
    )
};

export default IngredientDetails;