import { Button } from 'antd'
import React from 'react'

export const InfoButton = ({ onClick, icon = undefined, children, ...props }) => (
  <Button
    type="default"
    icon={icon}
    onClick={onClick}
    className="w-full text-blue-600 border-blue-600 hover:!bg-blue-600 hover:!text-white hover:!border-blue-600 bg-white"
    {...props}
  >
    {children}
  </Button>
)
