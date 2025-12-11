import { CategorizedListItemDate } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../../../utils/date'
import { CategorizedListItemTitle } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { CategorizedListItemLink } from '../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import React from 'react'
import { useAccessContext } from '../../../../Context/AccessContext'
import { RoleRender } from '../../../../Components/Restrict/RoleRender/RoleRender'
import { ROLES } from '../../../../utils/roles'

export const CompanyListItem = ({ company }) => {
  const { getCompanyRouteByRole } = useAccessContext()

  return (
    <CategorizedListItemLink
      to={getCompanyRouteByRole({
        companyId: company?.companyId
      })}
    >
      <RoleRender role={ROLES.B2C} hide>
        <CategorizedListItemDate>{handleDateFormat(company?.createdAt)}</CategorizedListItemDate>
      </RoleRender>
      <CategorizedListItemTitle>{company?.name}</CategorizedListItemTitle>
      <CategorizedListItemCategoryContainer>
        <div>Jurisdiction:</div>
        <CategorizedListItemCategory>{company?.jurisdiction}</CategorizedListItemCategory>
      </CategorizedListItemCategoryContainer>
    </CategorizedListItemLink>
  )
}
