import React from 'react';
import style from './Button.module.css';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { TButtonProps } from '../../../types/types';


const Button = ({icon, text} : TButtonProps) => {
  const [typeIcon, setTypeIcon] = React.useState<boolean>(false);

  if(icon === "BurgerIcon"){
    return (
      <NavLink
        to="/"
        className={style.btn}
        onMouseEnter={() => setTypeIcon(!typeIcon)}
        onMouseLeave={() => setTypeIcon(!typeIcon)}
      >
        <BurgerIcon type={typeIcon ? "primary" : "secondary"}/>
        <p className="text text_type_main-default text_color_inactive ml-2">{text}</p>
      </NavLink>
    )
  };

  if(icon === "ListIcon"){
    return (
      <NavLink
        to="/feed"
        className={style.btn}
        onMouseEnter={() => setTypeIcon(!typeIcon)}
        onMouseLeave={() => setTypeIcon(!typeIcon)}
      >
        <ListIcon type={typeIcon ? "primary" : "secondary"}/>
        <p className="text text_type_main-default text_color_inactive ml-2">{text}</p>
      </NavLink>
    )
  };

  if(icon === "ProfileIcon"){
    return (
      <NavLink
      to="/profile"
        className={style.btn}
        onMouseEnter={() => setTypeIcon(!typeIcon)}
        onMouseLeave={() => setTypeIcon(!typeIcon)}
      >
        <ProfileIcon type={typeIcon ? "primary" : "secondary"}/>
        <p className="text text_type_main-default text_color_inactive ml-2">{text}</p>
      </NavLink>
    )
  };

  return(
    null
  );


};

export default Button;
