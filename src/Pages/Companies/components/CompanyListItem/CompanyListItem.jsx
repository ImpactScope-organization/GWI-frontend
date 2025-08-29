import { CategorizedListItemDate } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../../../utils/date'
import { CategorizedListItemTitle } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { CategorizedListItemLink } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import React from 'react'
import { useAccessContext } from '../../../../Context/AccessContext'

export const CompanyListItem = ({ company }) => {
  const { getCompanyRouteByRole, hasRoleForCompany } = useAccessContext()

  const isAccessible = hasRoleForCompany(company)

  return (
    <CategorizedListItemLink
      to={getCompanyRouteByRole({
        companyId: company?.companyId
      })}
    >
      <div>{isAccessible ? 'can be accessed' : 'cannot be accessed'}</div>
      <CategorizedListItemDate>{handleDateFormat(company?.createdAt)}</CategorizedListItemDate>
      <CategorizedListItemTitle>{company?.name}</CategorizedListItemTitle>
      <CategorizedListItemCategoryContainer>
        <div>Jurisdiction:</div>
        <CategorizedListItemCategory>{company?.jurisdiction}</CategorizedListItemCategory>
      </CategorizedListItemCategoryContainer>
    </CategorizedListItemLink>
  )
}
