import { Button } from 'antd'
import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'

export const FilledSuccessButton = ({
  onClick,
  icon = undefined,
  isLoading,
  children,
  type = 'button',
  ...props
}) => (
  <Button
    icon={icon}
    onClick={onClick}
    htmlType={type}
    className="w-full flex justify-center items-center text-white bg-primary border-primary hover:!bg-white font-bold"
    disabled={!!props?.disabled || isLoading}
    {...props}
  >
    {isLoading && <LoadingOutlined spin />}
    {children}
  </Button>
)
