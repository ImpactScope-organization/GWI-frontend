import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import React from 'react'
import { PageContentContainer } from '../../Components/Page/PageContentContainer/PageContentContainer'
import { ROUTES } from '../../routes'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'

export const Prompts = () => {
  return (
    <PageContainer>
      <PageHeader title="Prompts" subTitle="Overview all of prompts here">
        <ButtonLink to={ROUTES.prompts.create}>Add new prompt</ButtonLink>
      </PageHeader>
      <PageContentContainer>Prompts</PageContentContainer>
    </PageContainer>
  )
}
