import { PageHeader } from '../../../Components/Page/PageHeader/PageHeader'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'

export const CompanyPaywall = () => {
  return (
    <PageContainer>
      <TitleWithBackButton title={`company name`} to={ROUTES.companies.index} />
    </PageContainer>
  )
}
