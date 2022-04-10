import React from 'react';
import style from './Card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../../types/hooks';
import { useDrag } from "react-dnd";
import { TIngredient } from '../../../types/types';


type TCardProps = {
  item: TIngredient;
  openDetails: () => void;
}

export default function Card({ item, openDetails }: TCardProps) {

  const cartIngredients = useSelector((state) => state.cartIngredient.сartIngredients);
  const buns = useSelector((state) => state.cartIngredient.bunIngredients);
  const counter = [...cartIngredients, ...buns].filter(el => el._id === item._id).length;

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: item,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const [, bunRef] = useDrag({
    type: 'bun',
    item: item
  });

  return (
    <div ref={item.type === 'bun' ? bunRef : ref}
      className={`${style.cardItem} pl-2 pr-2`}
      onClick={openDetails}
      key={item._id}
      style={{ opacity }}>
      
      {
        counter > 0 
          ? (< Counter count={item.type === 'bun' ? counter + 1 : counter} size="default" />)
          : ('')
      }


      <img className="p-2 pb-4" src={item.image} alt={item.name} />
      <span className={style.priceCard}>
        <p className="text text_type_digits-default mr-2">{item.price}</p>
        <CurrencyIcon type="primary" />
      </span>
      <p className="text text_type_main-default pb-5 pt-5">{item.name}</p>
    </div>
  )
}