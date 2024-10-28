import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'

export const PromptContainer = ({ title, children }) => (
  <PageContainer className="pb-10">
    <div className="flex items-top w-full gap-8">
      <BackButtonLink to={ROUTES.prompts.index} />
      <h2 className="text-darkBlack font-bold text-3xl">{title}</h2>
    </div>
    {children}
  </PageContainer>
)
