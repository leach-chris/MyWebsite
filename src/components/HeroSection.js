import React from 'react'
import { Button } from './Button'
import './HeroSection.css'
import '../App.css'

// Put this above the h1 tag to add video - <video src='/videos/video-1.mp4' autoPlay loop muted />


function HeroSection() {
  return (
    <div className='hero-container'>
        <h1>THIS IS MY WEBSITE</h1>
        <p>More to come</p>
        <div className='hero-btns'>
            <Button
                className='bts'
                buttonStyle='btn--outline'
                buttonSize='btn--large'>
                    Button
            </Button>
            <Button
            className='bts'
            buttonStyle='btn--primary'
            buttonSize='btn--large'>
                Button <i className='far-fa-play-circle' />
            </Button>
        </div>
    </div>
  )
}

export default HeroSection