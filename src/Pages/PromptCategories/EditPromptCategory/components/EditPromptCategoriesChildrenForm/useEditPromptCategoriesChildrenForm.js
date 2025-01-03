import { createPromptCategory, getPromptCategories } from '../../../api/PromptCategoryApi'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export const useEditPromptCategoriesChildrenForm = () => {
  const [newCategoryName, setNewCategoryName] = useState('')

  const { data: subCategories, refetch: refetchSubCategories } = useQuery({
    queryKey: ['getPromptCategories'],
    queryFn: () => getPromptCategories(),
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
