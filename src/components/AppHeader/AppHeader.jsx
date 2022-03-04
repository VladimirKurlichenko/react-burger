import React from 'react';
import style from './AppHeader.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Button from './Button/Button';
import { Link, NavLink } from 'react-router-dom';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

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

        // <header className={`${style.header}
        //             text text_type_main-small text_color_inactive 
        //             pt-2 pb-2 pl-8 pr-8`}>

        //     <nav className={style.nav}>
        //         <NavLink
        //             exact to={{
        //                 pathname: '/',
        //                 state: { type: 'secondary' }
        //             }}
        //             activeClassName={style.activeLink}
        //             className={`${style.nav_element} ${style.push_left} pt-2 pb-2 pl-5 pr-5 ${style.link}`}
        //         >
        //             <BurgerIcon type="secondary" />
        //             <p className={`${style.app_header_button} ml-2`}>Конструктор</p>
        //         </NavLink>


        //         <div className={`${style.nav_element} ${style.push_left} pt-2 pb-2 pl-5`}>
        //             <ListIcon type="secondary" />
        //             <p className={`${style.app_header_button} ml-2`}>Лента заказов</p>
        //         </div>
        //         <Link to={{ pathname: "/" }} className={style.center}>
        //             <Logo />
        //         </Link>
        //         <div className={`${style.nav_element} pt-2 pb-2 pl-5 pr-5`}>
        //             <ProfileIcon type="secondary" />
        //             <NavLink
        //                 to={{ pathname: '/profile' }}
        //                 activeClassName={style.activeLink}
        //                 className={`text text_type_main-small text-color-inactive ml-2 ${style.link}`}>
        //                 Личный кабинет
        //             </NavLink>
        //         </div>
        //     </nav>
        // </header>
    );
}

export default AppHeader;