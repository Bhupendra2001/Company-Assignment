import React from 'react'
import {Link} from 'react-router-dom'
import IMG from './bhupendra.jpg'
import './Navbar.css'
function Navbar() {
  return (
    <div className='navbar'>
     <div className='container'>
    <div className='logo'>
      <Link to='/'>
     <img src={IMG} alt='' width={110}/>
      </Link>
    </div>
    <div className='links'>
        <Link  className='link' to='/Form' ><h6>User Form</h6></Link>
        <Link className='link' to='/Button'><h6>Button With Time</h6></Link>
        <Link className='link' to='/newbutton'> <h6>New Inputs</h6></Link>
        <Link className='link' to='/stopwatch'><h6>Stop watch</h6></Link>
    </div>


    </div>
    </div>
  )
}

export default Navbar