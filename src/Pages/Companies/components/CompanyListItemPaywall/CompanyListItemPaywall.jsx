import React, { useMemo } from 'react'
import { CategorizedListItemLink } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemTitle } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { StarFilled } from '@ant-design/icons'
import { config } from '../../../../config'
import { useAuthContext } from '../../../../Context/AuthContext'

export const CompanyListItemPaywall = ({ company, disabled = false }) => {
  // const paymentLink = https://buy.stripe.com/test_dRm4gy5ZpaYWcEhdAL5EY01?prefilled_email=bereczkybalazs1%40gmail.com&locale=en&client_reference_id=asdf123311s
  const {
    userInfo: { email, id }
  } = useAuthContext()
  const paymentLink = useMemo(() => {
    return disabled
      ? ''
      : `${config.stripeQuarterlyProductPaymentUrl}?prefilled_email=${email}&client_reference_id=${id}`
  }, [disabled, email, id])

  return (
    <CategorizedListItemLink to={paymentLink}>
      <div className="relative">
        <div className="absolute right-0 text-primary">
          <StarFilled />
        </div>
        <CategorizedListItemTitle>{company?.name}</CategorizedListItemTitle>
        <CategorizedListItemCategoryContainer>
          <div>Jurisdiction:</div>
          <CategorizedListItemCategory>{company?.jurisdiction}</CategorizedListItemCategory>
        </CategorizedListItemCategoryContainer>
      </div>
    </CategorizedListItemLink>
  )
}
