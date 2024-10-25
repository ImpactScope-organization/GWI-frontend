import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import React from 'react'
import { PageContentContainer } from '../../Components/Page/PageContentContainer/PageContentContainer'

export const Prompts = () => {
  return (
    <PageContainer>
      <PageHeader title="Prompts" subTitle="Overview all of prompts here"></PageHeader>
      <PageContentContainer>Prompts</PageContentContainer>
    </PageContainer>
  )
}
