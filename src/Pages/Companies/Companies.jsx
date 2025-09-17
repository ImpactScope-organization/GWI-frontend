import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { ROUTES } from '../../routes'
import { CategorizedListContainer } from '../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import React from 'react'
import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { useFetchCompanyList } from './api/CompanyApiQuery'
import { RoleRender } from '../../Components/Restrict/RoleRender/RoleRender'
import { ROLES } from '../../utils/roles'
import { CompanyListItem } from './components/CompanyListItem/CompanyListItem'
import { CompanyListItemPaywall } from './components/CompanyListItemPaywall/CompanyListItemPaywall'
import { useAccessContext } from '../../Context/AccessContext'

export const Companies = () => {
  const { data } = useFetchCompanyList()
  const { hasRoleForCompany } = useAccessContext()

  const hasCompanies = data && data?.length > 0

  return (
    <PageContainer>
      <PageHeader title="Companies" subTitle="Overview all of companies here">
        <RoleRender role={ROLES.ADMIN}>
          <ButtonLink to={ROUTES.companies.create}>Add new company</ButtonLink>
        </RoleRender>
      </PageHeader>
      <CategorizedListContainer>
        {!hasCompanies && (
          <h1 className="w-[calc(100vw-100px text-center)]">
            No records found. Please add a new company.
          </h1>
        )}
        {hasCompanies &&
          data?.map((company) =>
            hasRoleForCompany(company) ? (
              <CompanyListItem key={`company_list_item_${company?._id}`} company={company} />
            ) : (
              <CompanyListItemPaywall
                key={`company_list_item_disabled_${company?._id}`}
                company={company}
              />
            )
          )}
      </CategorizedListContainer>
    </PageContainer>
  )
}
