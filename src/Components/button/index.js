import React from 'react'

function Button({ onClick, isDisabled = false, children, classes = '' }) {
  return (
    <button
      disabled={isDisabled}
      onClick={(e) => {
        e.preventDefault()
        onClick()
      }}
      className={`bg-darkGreen text-lg rounded-2xl py-3 px-4 border-none outline-none text-[#fff] ${classes}`}
    >
      {children}
    </button>
  )
}

export default Button
