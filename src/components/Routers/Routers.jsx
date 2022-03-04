
import style from './Routers.module.css';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Route, Switch, useLocation, useHistory, matchPath, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';

import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import Login from '../../pages/Login/Login';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register/Register';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';

import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

import { getUserData } from '../../services/actions/auth';

import { VISIBLE_ORDER_DETAILS, VISIBLE_INGREDIENT_DETAILS } from '../../services/actions/modals';

export default function Routes() {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const user = useSelector(store => store.user);

    const background = location.state?.background;
    console.log(location, background, "location");

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUserData());
    }, [dispatch])

    useEffect(() => {
        return background && history.replace({
            pathname: location.pathname,
            state: undefined
        })
    }, [])

    const { visibleOrderDetails, visibleIngredientDetails } = useSelector(store => store.modals);

    const openModalOrderDetails = () => {
        if(user.username){
            dispatch({ type: VISIBLE_ORDER_DETAILS, value: true })
          }
          else{
            dispatch({ type: VISIBLE_ORDER_DETAILS, value: false })
          }
       
    }

    const openModalIngredientDetails = () => {
        dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: true })
    }

    const closeModal = () => {
        dispatch({ type: VISIBLE_ORDER_DETAILS, value: false })
        dispatch({ type: VISIBLE_INGREDIENT_DETAILS, value: false })
        if (background) {
            history.replace({ pathname: background.pathname });
        }
    }

    return (
        <>
             <Switch location={background || location}>

                <Route path='/register'>
                    <Register />
                </Route>

                <Route path='/login'>
                    <Login />
                </Route>

                <Route path='/forgot-password'>
                    <ForgotPassword />
                </Route>

                <Route path='/reset-password'>
                    <ResetPassword />
                </Route>

                <Route exact={true} path='/ingredients/:id'>
                    <IngredientDetails />
                </Route>

                <ProtectedRoute path='/profile'>
                    <Profile />
                </ProtectedRoute>

                <Route exact={true} path='/'>
                    <main className={style.main}>
                        <DndProvider backend={HTML5Backend}>
                            <section className={`${style.burgerIngredients} mr-10 ml-10`}>
                                <BurgerIngredients
                                    openIngredientDetails={openModalIngredientDetails}
                                />
                            </section>
                            <section className={`${style.burgerConstructor} mt-25 mr-10`}>
                                <BurgerConstructor
                                    openIngredientDetails={openModalIngredientDetails}
                                    openOrderDetails={openModalOrderDetails}
                                />
                            </section>
                        </DndProvider>
                    </main>

                    {visibleOrderDetails && <>
                    {
                        user.username ? (
                            <Modal onClose={closeModal}>
                                <OrderDetails />
                            </Modal>
                          ) : (
                            <Redirect
                            to={{
                              pathname: '/login',
                              state: { from: location }
                            }}
                          />           
                          )
                    }
                    </>
                                  
                         
                       
                    }
                </Route>

                <Route>
                    <PageNotFound />
                </Route>
            </Switch>

            {
                background && visibleIngredientDetails &&
                <Route exact={true} path='/ingredients/:id'>
                    <Modal onClose={closeModal}>
                        <IngredientDetails />
                    </Modal>
                </Route>
            }
        </>
    )
}