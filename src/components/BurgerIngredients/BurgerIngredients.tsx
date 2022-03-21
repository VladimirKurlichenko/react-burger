import React, {useRef} from 'react';
import style from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from './Card/Card';
import { useSelector, useDispatch } from 'react-redux';
import { SET_ACTIVE_INGREDIENT } from '../../services/actions/ingredientDetails';
import { useHistory, useLocation } from 'react-router-dom';
import { TIngredient} from '../../types/types';

interface IBurgerIngredients {
    openIngredientDetails: () => void;
  }

const BurgerIngredients = ({openIngredientDetails}:  IBurgerIngredients) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const {ingredientsData} = useSelector((state: any) => state.ingredients)
    const [current, setCurrent] = React.useState<string>('bun');

    const refBun = useRef<null | HTMLDivElement>(null); 
    const refSauce = useRef<null | HTMLDivElement>(null); 
    const refMain = useRef<null | HTMLDivElement>(null); 

    const handleScroll = (e: string) => {
        setCurrent(e);
        if (e === "bun") {refBun.current?.scrollIntoView({ behavior: 'smooth' })};
        if (e === "sauce") {refSauce.current?.scrollIntoView({ behavior: 'smooth' })};
        if (e === "main") {refMain.current?.scrollIntoView({ behavior: 'smooth' })};
    };
    const handleActiveTab = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;

        const bunTop = refBun.current?.getBoundingClientRect().top as number;
        const sauceTop = refSauce.current?.getBoundingClientRect().top as number;
        const mainTop = refMain.current?.getBoundingClientRect().top as number;

        if (scrollTop < bunTop) setCurrent('bun');
        if (scrollTop > bunTop && scrollTop < sauceTop) setCurrent('sauce');
        if (scrollTop > mainTop) setCurrent('main');
    }

    const ingredientsList = (type: 'bun' | 'sauce' | 'main') => {
        return ingredientsData
            .filter((ingredient: TIngredient) => ingredient.type === type)
            .map((ingredient: TIngredient) => {
                const openDetails = () => {
                    dispatch({ type: SET_ACTIVE_INGREDIENT, activeIngredient: ingredient })
                    openIngredientDetails();
                    history.push({ pathname: `/ingredients/${ingredient._id}`, state: { background: location } })
                    console.log("Test")
                }
                return (<Card item={ingredient} key={ingredient._id} openDetails={openDetails} />)
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

export default BurgerIngredients;

