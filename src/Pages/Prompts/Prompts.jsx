import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import React from 'react'
import { PageContentContainer } from '../../Components/Page/PageContentContainer/PageContentContainer'
import { getRouteWithId, ROUTES } from '../../routes'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { usePrompts } from './usePrompts'
import { CategorizedListItemLink } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListContainer } from '../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import { CategorizedListItemDate } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../utils/date'
import { CategorizedListItemTitle } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'

export const Prompts = () => {
  const { prompts } = usePrompts()

  return (
    <PageContainer>
      <PageHeader title="Prompts" subTitle="Overview all of prompts here">
        <ButtonLink to={ROUTES.prompts.create}>Add new prompt</ButtonLink>
      </PageHeader>
      <PageContentContainer>
        <CategorizedListContainer>
          {prompts.map((prompt) => (
            <CategorizedListItemLink
              to={getRouteWithId(ROUTES.prompts.edit, prompt?.id)}
              key={`prompt_list_item_${prompt.id}`}
            >
              <CategorizedListItemDate>
                {handleDateFormat(prompt?.updatedAt)}
              </CategorizedListItemDate>
              <CategorizedListItemTitle>{prompt?.name}</CategorizedListItemTitle>
              <CategorizedListItemCategoryContainer>
                Category:
                <CategorizedListItemCategory>{prompt?.category}</CategorizedListItemCategory>
              </CategorizedListItemCategoryContainer>
            </CategorizedListItemLink>
          ))}
        </CategorizedListContainer>
      </PageContentContainer>
    </PageContainer>
  )
}
