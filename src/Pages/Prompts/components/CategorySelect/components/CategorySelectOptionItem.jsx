import React from 'react'

export const CategorySelectOptionItem = ({ category: { id, name }, onClick }) => (
  <div
    onClick={() => onClick(id)}
    className="w-full hover:bg-primary hover:text-white p-2 rounded cursor-pointer"
  >
    <div>{name}</div>
  </div>
)
