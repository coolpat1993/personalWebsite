import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import video from '../videos/video-1.mp4'

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <h1>Patrick Shepherd</h1>
      <p>Junior Software Developer</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          ABOUT ME
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--white'
          buttonSize='btn--large'
        >
          RANDOM PROJECT
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
