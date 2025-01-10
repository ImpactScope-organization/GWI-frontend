import { useCallback, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getSubCategoriesByParentId } from '../../../api/PromptSubCategoryApi'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createPromptCategory } from '../../../api/PromptCategoryApi'

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
    await createPromptCategory({
      name: subCategoryName,
      parentId: id,
      isQuantitative: true
    })
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
