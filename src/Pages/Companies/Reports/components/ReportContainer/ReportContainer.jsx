import React from 'react'
import { getRouteWithParams, ROUTES } from '../../../../../routes'
import { ButtonLink } from '../../../../../Components/ButtonLink/ButtonLink'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { PageContentContainer } from '../../../../../Components/Page/PageContentContainer/PageContentContainer'
import { CategorizedListContainer } from '../../../../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import { PageTab } from '../../../../../Components/Page/PageTab/PageTab'
import { useGetCompany } from '../../../api/CompanyApiQuery'
import { PageHeaderWithBackButton } from '../../../../../Components/Page/PageHeaderWithBackButton/PageHeaderWithBackButton'
import { ROLES } from '../../../../../utils/roles'
import { RoleRender } from '../../../../../Components/Restrict/RoleRender/RoleRender'

export const ReportContainer = ({ children }) => {
  const { company, companyId } = useGetCompany()

  return (
    <PageContainer>
      <PageHeaderWithBackButton
        title={company?.name}
        subTitle={company?.jurisdiction}
        to={ROUTES.companies.index}
      >
        <div className="flex gap-4">
          <RoleRender role={ROLES.ADMIN}>
            <ButtonLink
              bgColor={'bg-yellow-500'}
              to={getRouteWithParams(ROUTES.companies.edit, {
                companyId
              })}
            >
              Edit company
            </ButtonLink>
          </RoleRender>
          <ButtonLink
            to={getRouteWithParams(ROUTES.companies.reports.create, {
              companyId
            })}
          >
            Add new report
          </ButtonLink>
        </div>
      </PageHeaderWithBackButton>

      {/* Tabs Container */}
      <PageContentContainer>
        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.internal, {
            companyId
          })}
        >
          Internal reports
        </PageTab>
        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.regulator, {
            companyId
          })}
        >
          Sent to regulator
        </PageTab>
        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.processing, {
            companyId
          })}
        >
          Processing reports
        </PageTab>
      </PageContentContainer>

      {/* Reports Container */}
      <CategorizedListContainer>{children}</CategorizedListContainer>
    </PageContainer>
  )
}
