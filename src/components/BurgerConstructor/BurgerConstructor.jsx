import React from 'react';
import style from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import {DataIngredients} from "../../utils/data"



const BurgerConstructor = () => {
    const {ingredients, setIngredients} = React.useContext(DataIngredients);
    
    const [orderNum, setorderNum] = React.useState(0);
    const [bun, setBun] = React.useState({});
    const [orderCost, setOrderCost] = React.useState('0');
    const [modalOrder, setModalVisible] = React.useState(false);
    const [idIngredientsToRequest, setIdIngredientsToRequest] = React.useState([]);

    const PostRequest = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "ingredients": idIngredientsToRequest })
        };
        fetch('https://norma.nomoreparties.space/api/orders', requestOptions)
            .then(result => {
                if (result.ok) {
                    return result.json();
                }
                return Promise.reject(`Ошибка ${result.status}`);
            })
            .then((result) => {
                setorderNum(result.order.number);
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    React.useEffect(() => {
        ingredients.filter(item => item.name === 'Краторная булка N-200i').map(item => {
            return setBun(item);
        })
    })
   
    React.useEffect(() => {
        let priceItems = 0;
        const idIngredients= [];
        idIngredients.push(bun._id);
        ingredients.filter(item => item.type !== 'bun').map(item => {
            idIngredients.push(item._id);
            return priceItems = priceItems +  Number(item.price);
        });
        const orderCost = Number(bun.price) * 2  + priceItems;
        setOrderCost(String(orderCost));
        setIdIngredientsToRequest(idIngredients);
    }, [bun, ingredients])

    const handleModalIsOpen = () => { 
        setModalVisible(true);
        PostRequest();
    };
    const handleModalIsClose = () => { setModalVisible(false); };
    
    return (
        <>
            <div className={style.constructor}>
                <div className={`${style.ingredient} mb-2 ml-6` }>
                    <ConstructorElement
                        type='top'
                        isLocked={true}
                        text={`${bun.name} (верх)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>
                <div className={style.ingredients}>
                    
                    {
                        ingredients.filter(item => item.type !== 'bun').map(item => {
                            return(
                                <div key={item._id} className={`${style.ingredient} mb-2 mt-2`} >
                                    <div className={style.dragIcon}>
                                        <DragIcon type="primary" />
                                    </div>
                                    <ConstructorElement
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image_mobile}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`${style.ingredient} mb-2 mt-2 ml-6` }  >
                    <ConstructorElement
                        type='bottom'
                        isLocked={true}
                        text={`${bun.name} (низ)`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                </div>

                <div className={style.orderSection}>
                    <div className={style.price}>
                        <p className="text text_type_digits-medium mr-3">{orderCost}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <Button type="primary" size="medium" onClick={handleModalIsOpen}>
                        Оформить заказ
                    </Button>
                </div>

            </div>
            {modalOrder && (
                <OrderDetails onClose={handleModalIsClose} orderNum={String(orderNum)} />
            )}
        </>
  );
}

// BurgerConstructor.propTypes = {
//     items: PropTypes.array.isRequired
// }

export default BurgerConstructor;