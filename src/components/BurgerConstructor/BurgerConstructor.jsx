import style from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ADD_CART_INGREDIENT, ADD_CART_INGREDIENT_BUN, DELETE_CART_INGREDIENT, MOVE_CART_INGREDIENT} from '../../services/actions/cartIngredient';
import { VISIBLE_ORDER_DETAILS} from '../../services/actions/modals';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { GET_ORDER_INGREDIENTS_ID } from '../../services/actions/orderDetails';
import PropTypes from 'prop-types';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function BurgerConstructor({ openOrderDetails }) {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(uuidv4(), "uuidv4");
  const items = useSelector(state => state.cartIngredient.сartIngredients);
  const bun = useSelector(state => state.cartIngredient.bunIngredients[0]);
  const user = useSelector(store => store.user);

  const orderCost = bun ? [bun, bun, ...items].reduce((acc, ing) => acc += ing.price, 0)
    : items.reduce((acc, ing) => acc += ing.price, 0);

  const ingredientsIDs = items.map(item => item._id);

  const orderBurger = () => {
    if(user.username){
      if (bun && items.length !== 0) {
        openOrderDetails();
        dispatch({ type: GET_ORDER_INGREDIENTS_ID, ingredientsIDs: ingredientsIDs })
      }
    }
    else{
      openOrderDetails();
      history.replace({ pathname: '/login' });
    }
   
  }

  const deleteIngredient = (index) => {
    dispatch({ type: DELETE_CART_INGREDIENT, ingredients: index })
  }

  const ConstructorElementMiddle = ({ item, index }) => {
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
        padding: monitor.isOver()
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
    drop(ingredients) {
      ingredients['key'] = uuidv4();
      console.log(ingredients, "ingredients")
      dispatch({ type: ADD_CART_INGREDIENT, ingredients: ingredients })
    }
  });

  const [, bunDropTop] = useDrop({
    accept: 'bun',
    drop(ingredients) {
      ingredients['key'] = uuidv4();
      console.log(ingredients, "ingredients_bun")
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredients })
    }
  });

  const [, bunDropBottom] = useDrop({
    accept: 'bun',
    drop(ingredients) {
      ingredients['key'] = uuidv4();
      console.log(ingredients, "ingredients_bun")
      dispatch({ type: ADD_CART_INGREDIENT_BUN, ingredients })
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
              <ConstructorElement type='top'
                isLocked={true}
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
              <ConstructorElement type='bottom'
                isLocked={true}
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

BurgerConstructor.propTypes = {
  openOrderDetails: PropTypes.func.isRequired
}