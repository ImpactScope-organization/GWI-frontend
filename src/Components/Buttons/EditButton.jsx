import { Button } from 'antd'
import React from 'react'

export const EditButton = ({ onClick, icon = undefined, children, ...props }) => (
  <Button
    type="default"
    icon={icon}
    onClick={onClick}
    className="text-yellow-500 border-yellow-500 hover:!bg-yellow-500 hover:!text-white hover:!border-yellow-500 bg-white"
    {...props}
  >
    {children}
  </Button>
)
