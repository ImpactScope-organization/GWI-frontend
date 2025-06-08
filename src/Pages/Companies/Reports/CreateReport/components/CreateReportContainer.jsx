import { PageHeaderWithBackButton } from '../../../../../Components/Page/PageHeaderWithBackButton/PageHeaderWithBackButton'
import { getRouteWithParams, ROUTES } from '../../../../../routes'
import React from 'react'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { useGetCompany } from '../../../api/CompanyApiQuery'
import { useAccessContext } from '../../../../../Context/AccessContext'
import { PageContentContainer } from '../../../../../Components/Page/PageContentContainer/PageContentContainer'
import { PageTab } from '../../../../../Components/Page/PageTab/PageTab'

export const CreateReportContainer = ({ children }) => {
  const { company, companyId } = useGetCompany()
  const { getCompanyRouteByRole } = useAccessContext()

  return (
    <PageContainer>
      <PageHeaderWithBackButton
        title={`Add new report for ${company?.name}`}
        to={getCompanyRouteByRole({
          companyId
        })}
      />
      <PageContentContainer>
        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.create.document, {
            companyId
          })}
        >
          Document Report
        </PageTab>

        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.create.dynamic, {
            companyId
          })}
        >
          Dynamic Report
        </PageTab>

        <PageTab
          to={getRouteWithParams(ROUTES.companies.reports.create.manual, {
            companyId
          })}
        >
          Manual Report
        </PageTab>
      </PageContentContainer>

      <div>{children}</div>
    </PageContainer>
  )
}
