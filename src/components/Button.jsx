import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];



  return (
    <>
      {children.replace(/\s/g, '').toLowerCase() === 'randomproject' ?
        <Link to={`/${children.replace(/\s/g, '').toLowerCase()}${Math.floor(Math.random() * 10) + 1}`} className='btn-mobile'>
          <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
          >
            {children}
          </button>
        </Link> :
        <Link to={`/${children.replace(/\s/g, '').toLowerCase()}`} className='btn-mobile'>
          <button
            className={`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
          >
            {children}
          </button>
        </Link>
      }
    </>
  );
};
