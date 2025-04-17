import React from 'react'
import LoadingPage from '../../../../../Components/loading'
import { BackButtonLink } from '../../../../../Components/BackButtonLink/BackButtonLink'
import { getRouteWithParams, ROUTES } from '../../../../../routes'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { QualitativeReportDetails } from './containers/QualitativeReportDetails/QualitativeReportDetails'
import { QuantitativeReportDetails } from './containers/QuantitativeReportDetails/QuantitativeReportDetails'
import { useCurrentCompanyReport } from '../hooks/useCurrentCompanyReport'
import { ReportDocuments } from '../components/ReportDocuments/ReportDocuments'
import { ReportVisibility } from './containers/ReportVisibility/ReportVisibility'
import { useParams } from 'react-router-dom'
import { RoleRender } from '../../../../../Components/Restrict/RoleRender/RoleRender'
import { ROLES } from '../../../../../utils/roles'

export const SpecificReportIndex = () => {
  const { companyId } = useParams()
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }
  return (
    <PageContainer>
      <BackButtonLink
        to={getRouteWithParams(ROUTES.companies.reports.internal, {
          companyId
        })}
      />

      <div id="report-container" className="flex flex-col md:flex-row gap-6 max-w-[1120px] mx-auto">
        <QualitativeReportDetails />

        <div>
          <QuantitativeReportDetails />
          <ReportDocuments />
          <RoleRender role={ROLES.ADMIN}>
            <ReportVisibility />
          </RoleRender>
        </div>
      </div>
    </PageContainer>
  )
}
