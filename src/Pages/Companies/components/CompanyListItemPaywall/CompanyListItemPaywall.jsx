import React from 'react'
import { CategorizedListItemLink } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemDate } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../../../utils/date'
import { CategorizedListItemTitle } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { useAccessContext } from '../../../../Context/AccessContext'
import { StarFilled } from '@ant-design/icons'

export const CompanyListItemPaywall = ({ company }) => {
  const { getCompanyRouteByRole } = useAccessContext()

  return (
    <CategorizedListItemLink
      to={getCompanyRouteByRole({
        companyId: company?.companyId
      })}
    >
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
