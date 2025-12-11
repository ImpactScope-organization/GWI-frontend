import React from 'react'
import { CategorizedListItemLink } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemTitle } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { Badge } from 'antd'
import { CategorizedListItemDate } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../../../../utils/date'
import { useCompanyAccessRequestModal } from '../../companyAccessRequest/useCompanyAccessRequestModal'
import { RoleRender } from '../../../../../Components/Restrict/RoleRender/RoleRender'
import { ROLES } from '../../../../../utils/roles'

export const CompanyListItemPaywall = ({ company }) => {
  const { modalContent, open } = useCompanyAccessRequestModal()

  return (
    <>
      <button onClick={open} className="cursor-pointer text-left">
        <Badge.Ribbon text="Premium">
          <CategorizedListItemLink to="#">
            <RoleRender role={ROLES.ADMIN}>
              <CategorizedListItemDate>
                {handleDateFormat(company?.createdAt)}
              </CategorizedListItemDate>
            </RoleRender>
            <CategorizedListItemTitle>{company?.name}</CategorizedListItemTitle>
            <CategorizedListItemCategoryContainer>
              <div>Jurisdiction:</div>
              <CategorizedListItemCategory>{company?.jurisdiction}</CategorizedListItemCategory>
            </CategorizedListItemCategoryContainer>
          </CategorizedListItemLink>
        </Badge.Ribbon>
      </button>
      {modalContent}
    </>
  )
}
