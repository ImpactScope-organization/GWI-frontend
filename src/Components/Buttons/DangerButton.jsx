import { Button } from 'antd'
import React from 'react'

export const DangerButton = ({ onClick, icon = undefined, children, ...props }) => (
  <Button
    type="default"
    icon={icon}
    onClick={onClick}
    className="text-red-600 border-red-600 hover:!bg-red-600 hover:!text-white hover:!border-red-600 bg-white"
    {...props}
  >
    {children}
  </Button>
)
