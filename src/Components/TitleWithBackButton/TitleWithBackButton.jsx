import React from 'react'
import { PageContainer } from '../Page/PageContainer/PageContainer'
import { BackButtonLink } from '../BackButtonLink/BackButtonLink'

export const TitleWithBackButton = ({ title, to, children }) => (
  <PageContainer className="pb-10">
    <div className="flex items-top w-full gap-8">
      <BackButtonLink to={to} />
      <h2 className="text-darkBlack font-bold text-3xl">{title}</h2>
    </div>
    {children}
  </PageContainer>
)
