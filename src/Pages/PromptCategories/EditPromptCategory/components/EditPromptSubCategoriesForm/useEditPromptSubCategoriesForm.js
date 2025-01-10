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

  const [subCategoryName, setSubCategoryName] = useState('')

  const {
    data: { result: subCategories },
    refetch: refetchSubCategories
  } = useQuery({
    queryKey: ['getSubCategoriesByParentId', id],
    queryFn: () => getSubCategoriesByParentId(id),
    initialData: []
  })

  const onSubCategoryNameChange = (event) => {
    setSubCategoryName(event.target.value)
  }

  const createSubCategory = useCallback(async () => {
    await createPromptSubCategory(subCategoryName, id)
    await refetchSubCategories()
    setSubCategoryName('')
    toast.success('Sub category created successfully')
  }, [id, subCategoryName, refetchSubCategories])

  return {
    subCategoryName,
    onSubCategoryNameChange,
    createSubCategory,
    subCategories,
    refetchSubCategories
  }
}
