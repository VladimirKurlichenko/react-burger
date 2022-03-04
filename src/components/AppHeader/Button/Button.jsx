import React from 'react';
import PropTypes from 'prop-types';
import style from './Button.module.css';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';

const Button = ({
  icon, text, onClick, className,
}) => {
  const [typeIcon, setTypeIcon] = React.useState(false);
  const onClickAction = e => {
    return onClick(e);
  };

  // <NavLink to="/about">About</NavLink>

  if(icon === "BurgerIcon"){
    return (
      <NavLink
        to="/"
        className={style.btn}
        onClick={onClickAction}
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
        to="/"
        className={style.btn}
        onClick={onClickAction}
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
        onClick={onClickAction}
        onMouseEnter={() => setTypeIcon(!typeIcon)}
        onMouseLeave={() => setTypeIcon(!typeIcon)}
      >
        <ProfileIcon type={typeIcon ? "primary" : "secondary"}/>
        <p className="text text_type_main-default text_color_inactive ml-2">{text}</p>
      </NavLink>
    )
  };

  return(
    <button></button>
  );


};

Button.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default Button;
