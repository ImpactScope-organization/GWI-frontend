import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'

export const CreatePrompt = () => {
  return (
    <PageContainer className="pb-10">
      <BackButtonLink to={ROUTES.reports.internal} />
      <div>Create new prompt</div>
    </PageContainer>
  )
}
