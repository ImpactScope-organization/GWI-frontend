import React from 'react'
import { Link } from 'react-router-dom'

export const BackButtonLink = ({ to }) => {
  return (
    <div className="mb-10">
      <Link to={to}>
        <img src="/assets/back_button.svg" alt="logo" className="cursor-pointer" />
      </Link>
    </div>
  )
}
