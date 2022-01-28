import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import {BurgerIcon, ListIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';

const Button = ({
  icon, text, onClick, className,
}) => {
  const [typeIcon, setTypeIcon] = React.useState(false);
  const onClickAction = e => {
    return onClick(e);
  };

  if(icon === "BurgerIcon"){
    return (
      <button
        className={className}
        onClick={onClickAction}
        onMouseEnter={() => setTypeIcon(!typeIcon)}
        onMouseLeave={() => setTypeIcon(!typeIcon)}
      >
        <BurgerIcon type={typeIcon ? "primary" : "secondary"}/>
        <p className="text text_type_main-default text_color_inactive">{text}</p>
      </button>
    )
  };

  if(icon === "ListIcon"){
    return (
      <button
        className={className}
        onClick={onClickAction}
        onMouseEnter={() => setTypeIcon(!typeIcon)}
        onMouseLeave={() => setTypeIcon(!typeIcon)}
      >
        <ListIcon type={typeIcon ? "primary" : "secondary"}/>
        <p className="text text_type_main-default text_color_inactive">{text}</p>
      </button>
    )
  };

  if(icon === "ProfileIcon"){
    return (
      <button
        className={className}
        onClick={onClickAction}
        onMouseEnter={() => setTypeIcon(!typeIcon)}
        onMouseLeave={() => setTypeIcon(!typeIcon)}
      >
        <ProfileIcon type={typeIcon ? "primary" : "secondary"}/>
        <p className="text text_type_main-default text_color_inactive">{text}</p>
      </button>
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
