import React from 'react';
import '../../App.css';
import { Button } from '../Button';
import './FourOhFour.css';
import video from '../../videos/video-1.mp4'

function FourOhFour() {
  return (
    <div className='FoF-container'>
      <video src={video} autoPlay loop muted />
      <h1>404</h1>
      <p>Looks like there was no page with this url, lets get you home</p>
      <div className='FoF-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          HOME
        </Button>
      </div>
    </div>
  );
}

export default FourOhFour;
