import React from 'react'
import Navbar from './Navbar'
import './Main.css'
import { ReactComponent as Logo } from './images/plate.svg'
const Main =()=>{
    return(
    <div className='Main-div'>
        <Navbar className='navbar'/>
        <div className='content'>
            <div className='content-left'>
                <h1>ROM ROM KITCHEN</h1>
                <p>made with love ♡</p>
                <button>know more ➜</button>

            </div>
            <Logo className='food'/>
        </div>
    </div>
    )
}
export default Main