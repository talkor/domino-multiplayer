import React from 'react';
import './Button.css';

const Button = props => {
  return (
    <button
      className={`game-button ${props.buttonType}`}
      onClick={props.onClick}
      value={props.value}
      type={props.type}
    >
      {props.name}
    </button>
  );
};

export default Button;
