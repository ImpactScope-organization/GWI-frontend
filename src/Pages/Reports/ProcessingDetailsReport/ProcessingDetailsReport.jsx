import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'

import { useProcessingDetailsReport } from './useProcessingDetailsReport'
import { Progress } from 'antd'
import { PageHeader } from '../../../Components/Page/PageHeader/PageHeader'
import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { getRouteWithId, ROUTES } from '../../../routes'
import { ButtonLink } from '../../../Components/ButtonLink/ButtonLink'
import React from 'react'

export const ProcessingDetailsReport = () => {
  const { percentage, processText, report, isReportCreated } = useProcessingDetailsReport()

  return (
    <PageContainer>
      <BackButtonLink to={ROUTES.reports.processing} />
      <PageHeader title={`Processing ${report?.companyName}`} subTitle={processText} />
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <Progress percent={percentage} format={(percent) => `${percent}%`} />
        {isReportCreated && (
          <ButtonLink to={getRouteWithId(ROUTES.specificReport.index, report?.id)}>
            Check out the report
          </ButtonLink>
        )}
      </div>
    </PageContainer>
  )
}
