import React, {useRef} from 'react';
import style from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from './Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { SET_ACTIVE_INGREDIENT } from '../../services/actions/ingredientDetails';

const BurgerIngredients = ({IngredientDetails}) => {

    const dispatch = useDispatch();

    const {ingredientsData} = useSelector(state => state.ingredients)
    console.log(ingredientsData);
    const [current, setCurrent] = React.useState('bun');

    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);

    const handleScroll = (e) => {
        setCurrent(e);
        if (e === "bun") {refBun.current.scrollIntoView({ behavior: 'smooth' })};
        if (e === "sauce") {refSauce.current.scrollIntoView({ behavior: 'smooth' })};
        if (e === "main") {refMain.current.scrollIntoView({ behavior: 'smooth' })};
    };

    const handleActiveTab = (e) => {
        const scrollTop = e.target.scrollTop;

        const bunTop = refBun.current.getBoundingClientRect().top;
        const sauceTop = refSauce.current.getBoundingClientRect().top;
        const mainTop = refMain.current.getBoundingClientRect().top;

        if (scrollTop < bunTop) setCurrent('bun');
        if (scrollTop > bunTop && scrollTop < sauceTop) setCurrent('sauce');
        if (scrollTop > mainTop) setCurrent('main');
    }

    const ingredientsList = (type) => {
        return ingredientsData
            .filter(ingredient => ingredient.type === type)
            .map((ingredient, index) => {
                const openDetails = () => {
                    dispatch({ type: SET_ACTIVE_INGREDIENT, activeIngredient: ingredient })
                    IngredientDetails();
                    console.log("Test")
                }
                return (<Card item={ingredient} key={index} openDetails={openDetails} />)
            });
    };

  return (
    <div className={style.burgerIngredients} onScroll={handleActiveTab}>
        <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
        <section>
        <div className={style.tab}>
            <Tab value="bun" active={current === 'bun'} onClick={handleScroll}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={handleScroll}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={handleScroll}>
                Начинки
            </Tab>
        </div>
        <div className={style.items}>
            <div className={style.bun}>
                <h4 className="text text_type_main-medium mt-4" ref={refBun}>Булки</h4>
                <div className={style.block}>
                    {ingredientsList("bun")}
                </div>
            </div>

            <div className={style.sauce}>
                <h4 className="text text_type_main-medium mt-4" ref={refSauce}>Соусы</h4>
                <div className={style.block}>
                    {ingredientsList("sauce")}
                </div>
            </div>

            <div className={style.main}>
                <h4 className="text text_type_main-medium mt-4" ref={refMain}>Начинки</h4>
                <div className={style.block}>
                    {ingredientsList("main")}
                </div>
            </div>

        </div>
        </section>
    </div>
  );
}

BurgerIngredients.propTypes = {
    openIngredientDetails: PropTypes.func.isRequired
}


export default BurgerIngredients;

