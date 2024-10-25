import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'

export const CreatePrompt = () => {
  return (
    <PageContainer className="pb-10">
      <div className="flex items-center w-full gap-8">
        <BackButtonLink to={ROUTES.reports.internal} />
        <h2 className="text-darkBlack font-bold text-3xl mb-1">Create new prompt</h2>
      </div>
    </PageContainer>
  )
}
