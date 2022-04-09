import style from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD_CART_INGREDIENT, ADD_CART_INGREDIENT_BUN, DELETE_CART_INGREDIENT, MOVE_CART_INGREDIENT} from '../../services/actions/cartIngredient';
import { useDispatch, useSelector } from '../../types/hooks';
import { useDrop, useDrag } from 'react-dnd';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { TIngredient, TIngredientsIDs } from '../../types/types';
import {VISIBLE_ORDER_DETAILS} from '../../services/actions/modals'
import {postOrder} from '../../services/actions/orderDetails'
interface IConstructorElementMiddleProps {
  item: TIngredient; 
  index: number;
}

interface IOrderCost {
  acc: number; 
  ing: TIngredient;
}

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector((state) => state.cartIngredient.сartIngredients);
  const bun = useSelector((state) => state.cartIngredient.bunIngredients[0]);
  const user = useSelector((state) => state.user);

  const orderCost = bun ? [bun, bun, ...items].reduce((acc, ing) => acc += ing.price, 0)
    : items.reduce((acc, ing)=> acc += ing.price, 0);

  const ingredientsIDs: TIngredientsIDs = items.map((item)=> item._id);

  const orderBurger = () => {
    if(user.username){
      if (bun && items.length !== 0) {
        dispatch({ type: VISIBLE_ORDER_DETAILS, value: true })
        dispatch(postOrder(ingredientsIDs));
      }
    }
    else{
      history.replace({ pathname: '/login' });
    }
   
  }

  const deleteIngredient = (index: number) => {
    dispatch({ type: DELETE_CART_INGREDIENT, ingredients: index })
  }

  const ConstructorElementMiddle = ({ item, index }: IConstructorElementMiddleProps) => {
    const [{ opacity }, dragRef] = useDrag({
      type: 'move',
      item: () => {
        return { item, index };
      },
      collect: monitor => ({
        opacity: monitor.isDragging() ? 0.5 : 1
      })
    })

    const [{ padding }, dropRef] = useDrop({
      accept: 'move',
      drop(ingredients) {
        dispatch({ type: MOVE_CART_INGREDIENT, ingredients, dropIndex: index })
      },
      collect: monitor => ({
        padding: monitor.isOver()? 30 : 0
      })
    });

    return (
      <div ref={dragRef} style={{ opacity }}>
        <div ref={dropRef} style={{ padding }}>
          <span className={`${style.ingredient} ml-2 mr-6 mt-2 mb-2`}>
            <DragIcon type='primary' />
            <ConstructorElement
              text={item.name}
              price={item.price}
              thumbnail={item.image}
              handleClose={() => deleteIngredient(index)}
            />
          </span>
        </div>
      </div>
    )
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredients: TIngredient) {
      dispatch({ type: ADD_CART_INGREDIENT, ingredients: {...ingredients, key: uuidv4()} })
    }
  });

  const [, bunDropTop] = useDrop({
    accept: 'bun',
    drop(ingredients: TIngredient) {
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredients: {...ingredients, key: uuidv4()} })
    }
  });

  const [, bunDropBottom] = useDrop({
    accept: 'bun',
    drop(ingredients: TIngredient) {
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredients: {...ingredients, key: uuidv4()} })
    }
  });

  return (
    <section>
      <div className={`${style.constructor} mb-4`} >
        {bun ?
          (
            <div ref={bunDropTop} className={`${style.ingredient} mb-2 mt-2 ml-6` } >
              <ConstructorElement type='top'
                isLocked={true}
                text={`${bun.name} (верх)`}
                thumbnail={bun.image}
                price={bun.price}
              />
            </div>
          ) : (
            <div ref={bunDropTop} className={`${style.ingredient} mb-2 mt-2 ml-6` }>
              <ConstructorElement 
                type='top'
                isLocked={true}
                text=''
                thumbnail='https://www.svgrepo.com/show/269976/baguettes-bread.svg'
                price={0}
              />
            </div>
          )
        }

        <div className={style.ingredients} ref={dropTarget} >
          {items.map((ingredient, index) => {
            return (
              <div className={`${style.ingredient} mb-2 mt-2`} key={ingredient.key} >
                <ConstructorElementMiddle item={ingredient} index={index} />
              </div>
            )
          })
          }
        </div>

        {bun ?
          (
            <div ref={bunDropBottom} className={`${style.ingredient} mb-2 mt-2 ml-6` }>
              <ConstructorElement type='bottom'
                isLocked={true}
                text={`${bun.name} (низ)`}
                thumbnail={bun.image}
                price={bun.price}
              />
            </div>
          ) : (
            <div ref={bunDropBottom} className={`${style.ingredient} mb-2 mt-2 ml-6` }>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text=''
                thumbnail='https://www.svgrepo.com/show/269976/baguettes-bread.svg'
                price={0}
              />
            </div>
          )
        }
      </div>

      <div className={style.orderSection}>
        <span className={`${style.price} m-5`}>
          <p className='text text_type_digits-medium mr-2'>{orderCost}</p>
          <CurrencyIcon type='primary' />
        </span>
        <Button type='primary'
          size='medium'
          onClick={orderBurger}>
          Оформить заказ
        </Button>
      </div>

    </section>
  )
}