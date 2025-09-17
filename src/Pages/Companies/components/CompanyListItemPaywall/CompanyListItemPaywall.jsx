import React from 'react'
import { CategorizedListItemLink } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemTitle } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { StarFilled } from '@ant-design/icons'
import { config } from '../../../../config'

export const CompanyListItemPaywall = ({ company, disabled = false }) => {
  return (
    <CategorizedListItemLink to={!disabled ? config.stripeQuarterlyProductPaymentUrl : ''}>
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
