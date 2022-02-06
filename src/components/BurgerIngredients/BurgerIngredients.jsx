import React from 'react';
import style from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import Card from './Card/Card';
import {Data} from "../../utils/data"

const BurgerIngredients = () => {
    const {items, setItems} = React.useContext(Data);

    const [current, setCurrent] = React.useState('bun')
  return (
    <div className={style.burgerIngredients}>
        <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
        <section>
        <div className={style.tab}>
            <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                Булки
            </Tab>
            <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                Соусы
            </Tab>
            <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                Начинки
            </Tab>
        </div>
        <div className={style.items}>
            <div className={style.bun}>
                <h4 className="text text_type_main-medium mt-4">Булки</h4>
                <div className={style.block}>
                    {items.filter(item => item.type === "bun").map(item => <Card key={item._id} item={item}/>)}
                </div>
            </div>

            <div className={style.sause}>
                <h4 className="text text_type_main-medium mt-4">Соусы</h4>
                <div className={style.block}>
                    {items.filter(item => item.type === "sauce").map(item => <Card key={item._id} item={item}/>)}
                </div>
            </div>

            <div className={style.main}>
                <h4 className="text text_type_main-medium mt-4">Начинки</h4>
                <div className={style.block}>
                    {items.filter(item => item.type === "main").map(item => <Card key={item._id} item={item}/>)}
                </div>
            </div>

        </div>
        </section>
    </div>
  );
}

// BurgerIngredients.propTypes = {
//     items: PropTypes.array.isRequired
// }

export default BurgerIngredients;
