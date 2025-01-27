import { Button } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const SuccessButton = ({ onClick, icon = undefined, isLoading, children, ...props }) => (
  <Button
    icon={icon}
    onClick={onClick}
    className="w-full flex justify-center items-center text-primary bg-white border-primary hover:!bg-primary hover:!text-white bg-white"
    disabled={!!props?.disabled || isLoading}
    {...props}
  >
    {isLoading && <LoadingOutlined spin />}
    {children}
  </Button>
)
