import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'
import { AuthPageContainer } from '../../Components/Page/AuthPageContainer/AuthPageContainer'
import { useConfirmPayment } from './useConfirmPayment'

export const ConfirmPayment = () => {
  const { isLoading } = useConfirmPayment()

  return (
    <AuthPageContainer subTitle="Welcome to GWI Premium!">
      <div className="w-full flex justify-center mt-12">
        {isLoading && <LoadingOutlined className="text-4xl" spin />}
      </div>
    </AuthPageContainer>
  )
}
