import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Header() {

    const navigate = useNavigate();

  return (
    <header>
        <div className='container'>
            <aside onClick={() => navigate('/')}>
                <img src="https://raw.githubusercontent.com/Fabricio-Rojas/web-assets/main/image/main%20white%20finished.png" alt='Page Logo' />
                <h2>POE Item Price Lister</h2>
            </aside>
            <nav>
                <ul>
                    <li><a href='/#'>Access API</a></li>
                    <li><a href='/#'>Documentation</a></li>
                    <li><a href='/#'>Contact Us</a></li>
                    <li><NavLink to="/new-item">Add new Item</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
  )
}

export default Header
