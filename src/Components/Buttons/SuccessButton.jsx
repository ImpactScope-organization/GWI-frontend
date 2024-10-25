import { Button } from 'antd'
import React from 'react'

export const SuccessButton = ({ onClick, icon = undefined, children }) => (
  <Button
    type="default"
    icon={icon}
    onClick={onClick}
    className="w-full text-primary border-primary hover:!bg-primary hover:!text-white"
  >
    {children}
  </Button>
)
