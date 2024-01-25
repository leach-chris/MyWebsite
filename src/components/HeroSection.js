import React from 'react'
import { Button } from './Button'
import './HeroSection.css'
import '../App.css'

// Put this above the h1 tag to add video - <video src='/videos/video-1.mp4' autoPlay loop muted />


function HeroSection() {
  return (
    <div className='hero-container'>
        <h1>THIS IS MY WEBSITE</h1>
        <p>Take a look around</p>
        <div className='hero-btns'>
            <Button
                className='bts'
                buttonStyle='btn--outline'
                buttonSize='btn--large'>
                    Weather
            </Button>
        </div>
    </div>
  )
}

export default HeroSection