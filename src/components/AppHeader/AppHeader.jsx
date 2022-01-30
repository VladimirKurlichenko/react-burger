import React from 'react';
import style from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Button from './Button/Button';

const AppHeader = () => {
    const handleClick = (textButton) =>{
        console.log("Вы нажали ", textButton)
    }
    return(
        <header className={style.header}>
            <div className={style.header_content}>
                <nav className={style.header_nav}>
                    <Button
                        icon={"BurgerIcon"}
                        text={"Конструстор"}
                        onClick={() => {handleClick("Конструстор")}}
                        className={"style.btn"}/>
                    <Button
                        icon={"ListIcon"}
                        text={"Лента заказов"}
                        onClick={() => {handleClick("Лента заказов")}}
                        className={"btn"}/>
                </nav>
                <Logo/>
                <div className={style.header_button_profile}>
                    <Button
                        icon={"ProfileIcon"}
                        text={"Личный кабинет"}
                        onClick={() => {handleClick("Личный кабинет")}}
                        className={"btn"}/>
                </div>
            </div>
        </header> 
    );
}

export default AppHeader;