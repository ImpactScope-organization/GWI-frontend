import React, { useCallback } from 'react'
import { ROUTES } from '../../../../routes'
import { ButtonLink } from '../../../../Components/ButtonLink/ButtonLink'
import { Link, useLocation } from 'react-router-dom'
import { PageContainer } from '../../../../Components/Page/PageContainer/PageContainer'
import { PageHeader } from '../../../../Components/Page/PageHeader/PageHeader'
import { PageContentContainer } from '../../../../Components/Page/PageContentContainer/PageContentContainer'
import { CategorizedListContainer } from '../../../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'

export const ReportContainer = ({ children }) => {
  const location = useLocation()

  const isRouteActive = useCallback(
    (route) => {
      return route === location.pathname
    },
    [location.pathname]
  )

  return (
    <PageContainer>
      <PageHeader title="Companies" subTitle="Overview all of companies here">
        <ButtonLink to={ROUTES.create}>Add new company</ButtonLink>
      </PageHeader>

      {/* Tabs Container */}
      <PageContentContainer>
        <Link
          to={ROUTES.reports.internal}
          className={`cursor-pointer ${
            isRouteActive(ROUTES.reports.internal)
              ? 'border-b-[2px] border-primary text-darkBlack font-semibold'
              : 'text-[#5f6264]'
          }  pb-1 `}
        >
          Internal reports
        </Link>
        <Link
          to={ROUTES.reports.regulator}
          className={`cursor-pointer ${
            isRouteActive(ROUTES.reports.regulator)
              ? 'border-b-[2px] border-primary text-darkBlack font-semibold'
              : 'text-[#5a5c5e]'
          }  pb-1 `}
        >
          Sent to regulator
        </Link>
      </PageContentContainer>

      {/* Reports Container */}
      <CategorizedListContainer>{children}</CategorizedListContainer>
    </PageContainer>
  )
}
