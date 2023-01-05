import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test', 'btn--white'];

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

  function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
  }

  const projects = [1, 'hello', 5, 8];

  function buttonDefaults() {
    return (<button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>)
  }


  return (
    <>
      {children.replace(/\s/g, '').toLowerCase() === 'randomproject' ?
        <Link to={`/${getRandomItem(projects)}`} className='btn-mobile'>
          {buttonDefaults()}
        </Link> :
        children.replace(/\s/g, '').toLowerCase() === 'home' ?
          <Link to='/' className='btn-mobile'>
            {buttonDefaults()}
          </Link> :
          <Link to={`/${children.replace(/\s/g, '').toLowerCase()}`} className='btn-mobile'>
            {buttonDefaults()}
          </Link>
      }
    </>
  );
};
