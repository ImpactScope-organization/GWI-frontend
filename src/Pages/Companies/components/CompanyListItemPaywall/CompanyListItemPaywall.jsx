import React, { useMemo } from 'react'
import { CategorizedListItemLink } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemTitle } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { StarFilled } from '@ant-design/icons'
import { config } from '../../../../config'
import { useAuthContext } from '../../../../Context/AuthContext'
import { CategorizedListItemDate } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../../../utils/date'

export const CompanyListItemPaywall = ({ company, disabled = false }) => {
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
        <CategorizedListItemDate>{handleDateFormat(company?.createdAt)}</CategorizedListItemDate>
        <CategorizedListItemTitle>{company?.name}</CategorizedListItemTitle>
        <CategorizedListItemCategoryContainer>
          <div>Jurisdiction:</div>
          <CategorizedListItemCategory>{company?.jurisdiction}</CategorizedListItemCategory>
        </CategorizedListItemCategoryContainer>
      </div>
    </CategorizedListItemLink>
  )
}
