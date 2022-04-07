import styles from './Routers.module.css';

import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Location } from "history";
import { Route, useLocation, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from '../../types/hooks';
import { useEffect } from 'react';
import { getIngredients } from '../../services/actions/ingredients';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';
import Login from '../../pages/Login/Login';
import ForgotPassword from '../../pages/ForgotPassword/ForgotPassword';
import Profile from '../../pages/Profile/Profile';
import Register from '../../pages/Register/Register';
import ResetPassword from '../../pages/ResetPassword/ResetPassword';
import ProfileOrders from '../../pages/ProfileOrders/ProfileOrders';
import Feed from '../../pages/Feed/Feed'
import OrderView from '../OrderView/OrderView';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { getUserData } from '../../services/actions/auth';
import { RootState } from '../../services/reducers/index';
import { TOrder } from '../../types/types';

interface ILocationState {
    background: Location;
    order: TOrder;
}

export default function Routes() {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<ILocationState>();
    const background = location.state?.background;

    const { visibleOrderDetails, visibleIngredientDetails, visibleOrdersDetails } = useSelector((store:RootState) => store.modals);

    useEffect(() => {
        dispatch(getIngredients());
        dispatch(getUserData());
    }, [dispatch])

    const closeModal = () => {
        dispatch({ type: 'VISIBLE_ORDER_DETAILS', value: false })
        dispatch({ type: 'VISIBLE_INGREDIENT_DETAILS', value: false })
        if (background) {
            history.replace({ pathname: background.pathname });
        }
    }

    return (
        <>
            <Switch location = {background || location}>

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

                <Route exact={true} path='/feed'>
                    <Feed />
                </Route>

                <Route path='/feed/:id'>
                    <OrderView modal={true} />
                </Route>

                <ProtectedRoute exact={true} path='/profile'>
                    <Profile />
                </ProtectedRoute>

                <ProtectedRoute exact={true} path='/profile/orders'>
                    <ProfileOrders />
                </ProtectedRoute>

                <ProtectedRoute path='/profile/orders/:id'>
                    <OrderView />
                </ProtectedRoute>

                <Route exact={true} path='/'>
                    <main className={styles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider>
                    </main>

                    {visibleOrderDetails &&
                        <Modal onClose={closeModal}>
                            <OrderDetails />
                        </Modal>
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

            {
                background && visibleOrdersDetails &&
                
                <Route exact={true} path={`${background.pathname}/:id`}>
                    <Modal onClose={closeModal}>
                        <OrderView modal={true}  order={location.state.order}/>
                    </Modal>
                </Route>
            }

        </>
    )
}