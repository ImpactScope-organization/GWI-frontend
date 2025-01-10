import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  createPromptSubCategory,
  getSubCategoriesByParentId
} from '../../../api/PromptSubCategoryApi'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export const useEditPromptSubCategoriesForm = () => {
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
      await createPromptSubCategory(newCategoryName, id)
      await refetchSubCategories()
      setNewCategoryName('')
      toast.success('Sub category created successfully')
    },
    [id, newCategoryName, refetchSubCategories]
  )

  return {
    newCategoryName,
    onCategoryNameChange,
    addSubCategory,
    subCategories,
    refetchSubCategories
  }
}
