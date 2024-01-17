import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button';
import './Navbar.css'


function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setBotton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobleMenu = () => setClick(false);

  const showButton = () => {
    if(window.innerWidth <= 960) {
      setBotton(false)
    }
    else {
      setBotton(true)
    }
  };

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo'>
            Chris Leach <i class="fa-solid fa-rocket"></i>
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobleMenu}>
                Button 1
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/services' className='nav-links' onClick={closeMobleMenu}>
                Button 2
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/Products' className='nav-links' onClick={closeMobleMenu}>
                Button 3
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobleMenu}>
                Button 4
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>Button 5</Button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar