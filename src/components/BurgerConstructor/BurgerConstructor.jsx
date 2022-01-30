import React from 'react';
import style from './BurgerConstructor.module.css';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';

const BurgerConstructor = ({items}) => {
    const [bun, setBun] = React.useState({
        name:"Флюоресцентная булка R2-D3",
        price: 988,
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png"
    })
    const [orderCost, setOrderCost] = React.useState('600');

    const [modalOrder, setModalVisible] = React.useState(false);
    const handleModalIsOpen = () => { setModalVisible(true); };
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
                        items.filter(item => item.type !== 'bun').map(item => {
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
                <OrderDetails onClose={handleModalIsClose} orderNum='058352' />
            )}
        </>
  );
}

BurgerConstructor.propTypes = {
    items: PropTypes.array.isRequired
}

export default BurgerConstructor;