import { PageContainer } from '../../Components/Page/PageContainer/PageContainer'
import { PageHeader } from '../../Components/Page/PageHeader/PageHeader'
import React from 'react'
import { PageContentContainer } from '../../Components/Page/PageContentContainer/PageContentContainer'
import { getRouteWithId, ROUTES } from '../../routes'
import { ButtonLink } from '../../Components/ButtonLink/ButtonLink'
import { CategorizedListItemLink } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListContainer } from '../../Components/CategorizedList/CategorizedListContainer/CategorizedListContainer'
import { CategorizedListItemDate } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { handleDateFormat } from '../../utils/date'
import { CategorizedListItemTitle } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { PageTab } from '../../Components/Page/PageTab/PageTab'
import { useRootPromptCategories } from './useRootPromptCategories'

export const PromptCategories = () => {
  const { rootPromptCategories } = useRootPromptCategories()

  return (
    <PageContainer>
      <PageHeader title="Prompt Categories" subTitle="Overview all of prompt categories here">
        <ButtonLink to={ROUTES.promptCategories.create}>Add new prompt category</ButtonLink>
      </PageHeader>

      <PageContentContainer>
        <PageTab to={ROUTES.prompts.index}>Prompts</PageTab>
        <PageTab to={ROUTES.promptCategories.index}>Prompt Categories</PageTab>
      </PageContentContainer>

      <PageContentContainer>
        <CategorizedListContainer>
          {rootPromptCategories.map((rootPromptCategory) => (
            <CategorizedListItemLink
              to={getRouteWithId(ROUTES.promptCategories.edit, rootPromptCategory?.id)}
              key={`root_prompt_category_list_item_${rootPromptCategory.id}`}
            >
              <CategorizedListItemDate>
                {handleDateFormat(rootPromptCategory?.updatedAt)}
              </CategorizedListItemDate>
              <CategorizedListItemTitle>{rootPromptCategory?.name}</CategorizedListItemTitle>
              <CategorizedListItemCategoryContainer>
                Quantitative:
                <CategorizedListItemCategory>
                  {rootPromptCategory?.isQuantitative ? 'Yes' : 'No'}
                </CategorizedListItemCategory>
              </CategorizedListItemCategoryContainer>
            </CategorizedListItemLink>
          ))}
        </CategorizedListContainer>
      </PageContentContainer>
    </PageContainer>
  )
}
