import { Button } from 'antd'
import React from 'react'

export const SuccessButton = ({ onClick, icon = undefined, children, ...props }) => (
  <Button
    icon={icon}
    onClick={onClick}
    className="w-full text-primary bg-white border-primary hover:!bg-primary hover:!text-white"
    {...props}
  >
    {children}
  </Button>
)
