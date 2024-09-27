import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonLink = ({ to, children, classes = '' }) => {
  return (
    <Link
      to={to}
      className={`bg-darkGreen text-lg rounded-2xl py-3 px-4 border-none outline-none text-[#fff] ${classes}`}
    >
      {children}
    </Link>
  )
}
