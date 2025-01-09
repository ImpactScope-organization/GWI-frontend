import { createPromptCategory } from '../../../api/PromptCategoryApi'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSubCategoriesByParentId } from '../../../api/PromptSubCategoryApi'
import { useParams } from 'react-router-dom'

export const useEditPromptCategoriesChildrenForm = () => {
  const { id } = useParams()

  const [newCategoryName, setNewCategoryName] = useState('')

  const {
    data: { result: subCategories },
    refetch: refetchSubCategories
  } = useQuery({
    queryKey: ['getSubCategoriesByParentId', id],
    queryFn: () => getSubCategoriesByParentId(id),
    initialData: []
  })

  const onCategoryNameChange = (event) => {
    event.preventDefault()
    setNewCategoryName(event.target.value)
  }

  const addSubCategory = useCallback(
    async (e) => {
      e.preventDefault()
      await createPromptCategory(newCategoryName)
      await refetchSubCategories()
      setNewCategoryName('')
    },
    [newCategoryName, refetchSubCategories]
  )

  return {
    newCategoryName,
    onCategoryNameChange,
    addSubCategory,
    subCategories,
    refetchSubCategories
  }
}
