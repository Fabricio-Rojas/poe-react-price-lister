import React from 'react'
import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <div className='page-not-found'>
      <h1>404</h1>
      <NavLink to="/">Return to Home</NavLink>
    </div>
  )
}

export default NotFound
