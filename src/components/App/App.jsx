import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngredients } from '../../services/actions/ingredients';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { VISIBLE_ORDER_DETAILS, VISIBLE_INGREDIENT_DETAILS } from '../../services/actions/modals';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from 'react-dnd';
import OrderDetails from '../OrderDetails/OrderDetails';

const App = () => {
  const dispatch = useDispatch();

  const {visibleOrderDetails, visibleIngredientDetails } = useSelector(state => state.modals);

  const openModalOrderDetails = () => {
    dispatch({ type: VISIBLE_ORDER_DETAILS, value: true })
  };

  const openModalIngredientDetails = () => {
    dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: true })
  };

  const closeModal = () => {
    dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: false });
    dispatch({ type: VISIBLE_ORDER_DETAILS, value: false });
  };

  React.useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch]);

  return (
    <>
      <div className={style.app}>
        <AppHeader/>
        <main className={style.main}>
          <DndProvider backend={HTML5Backend}>
            <div className={style.burgerIngredients}>
                <BurgerIngredients IngredientDetails={openModalIngredientDetails}/>
              </div>

              <div className={style.burgerConstructor}>
                <BurgerConstructor openIngredientDetails={openModalIngredientDetails}
                    openOrderDetails={openModalOrderDetails}/>
              </div>
          </DndProvider>
          </main>
      </div>

      {visibleOrderDetails &&
                <Modal onClose={closeModal}>
                    <OrderDetails />
                </Modal>
      }

      {visibleIngredientDetails &&
        <Modal onClose={closeModal}>
          <IngredientDetails />
        </Modal>
      }
    </>
  );
  };

export default App;
