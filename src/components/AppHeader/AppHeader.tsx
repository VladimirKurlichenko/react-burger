import React from 'react';
import style from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Button from './Button/Button';

const AppHeader = () => {
    return(
        <header className={style.header}>
            <div className={style.header_content}>
                <nav className={style.header_nav}>
                    <Button
                        icon={"BurgerIcon"}
                        text={"Конструстор"}/>
                    <Button
                        icon={"ListIcon"}
                        text={"Лента заказов"}/>
                </nav>
                <Logo/>
                <div className={style.header_button_profile}>
                    <Button
                        icon={"ProfileIcon"}
                        text={"Личный кабинет"}/>
                </div>
            </div>
        </header> 
    );
}

export default AppHeader;