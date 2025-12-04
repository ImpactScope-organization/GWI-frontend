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
import { CompanyListItemPaywall } from './components/Paywall/CompanyListItemPaywall/CompanyListItemPaywall'
import { useAccessContext } from '../../Context/AccessContext'
import { NewCompanyRequestButton } from './NewCompanyRequestButton'

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
      <RoleRender role={ROLES.B2C_USER}>
        <div className="mt-8 mb-5 h-px w-full bg-slate-200" />
        <div className="grid grid-cols-1 lg:grid-cols-3 space-y-4 lg:space-y-0 items-center">
          <p className="col-span-1 lg:col-span-2 subtitle-text text-center lg:text-left align-middle">
            Can't find the company you're looking for?
          </p>
          <NewCompanyRequestButton />
        </div>
      </RoleRender>
    </PageContainer>
  )
}
