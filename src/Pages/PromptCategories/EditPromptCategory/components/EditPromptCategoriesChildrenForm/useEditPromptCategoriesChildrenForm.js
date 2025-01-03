import { createPromptCategory, getPromptCategories } from '../../../api/PromptCategoryApi'
import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export const useEditPromptCategoriesChildrenForm = () => {
  const [newCategoryName, setNewCategoryName] = useState('')

  const { data: categoryItems, refetch: refetchCategoryItems } = useQuery({
    queryKey: ['getPromptCategories'],
    queryFn: () => getPromptCategories(),
    initialData: []
  })

  const onCategoryNameChange = (event) => {
    event.preventDefault()
    setNewCategoryName(event.target.value)
  }

  const addCategoryItem = useCallback(
    async (e) => {
      e.preventDefault()
      await createPromptCategory(newCategoryName)
      await refetchCategoryItems()
      setNewCategoryName('')
    },
    [newCategoryName, refetchCategoryItems]
  )

  return {
    newCategoryName,
    onCategoryNameChange,
    addCategoryItem,
    categoryItems,
    refetchCategoryItems
  }
}
