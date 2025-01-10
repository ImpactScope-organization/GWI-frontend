import { useFormikContext } from 'formik'
import { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getGroupedPromptCategories } from '../../PromptCategories/api/PromptCategoryApi'
import { useEditPrompt } from '../EditPrompt/context/EditPromptContext'

export const useCategorySelect = (name) => {
  const { prompt } = useEditPrompt()

  const isDisabled = !!prompt?.isDefaultPrompt
  const formik = useFormikContext()
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdownVisible = useCallback(() => {
    if (!isDisabled) {
      setDropdownVisible(!isDropdownVisible)
    }
  }, [isDisabled, isDropdownVisible])

  const hasError = formik.touched[name] && formik.errors[name]
  const errorMessage = formik.errors[name]

  const { data: groupedPromptCategories } = useQuery({
    queryKey: ['getGroupedPromptCategories'],
    queryFn: () => getGroupedPromptCategories(),
    initialData: []
  })

  const categoryIds = useMemo(() => {
    if (!groupedPromptCategories?.qualitative || !groupedPromptCategories?.quantitative) {
      return []
    }

    const flattenCategories = (categories) => {
      return categories.reduce((flattenedCategories, { id, name, subCategories }) => {
        flattenedCategories.push({ id, name })
        if (subCategories && subCategories.length > 0) {
          flattenedCategories = flattenedCategories.concat(flattenCategories(subCategories))
        }
        return flattenedCategories
      }, [])
    }

    return flattenCategories(groupedPromptCategories?.qualitative).concat(
      flattenCategories(groupedPromptCategories?.quantitative)
    )
  }, [groupedPromptCategories])

  const value = useMemo(() => {
    return formik.values[name]
      ? categoryIds.find(({ id }) => id === formik.values[name])?.name
      : 'Select a category'
  }, [categoryIds, formik.values, name])

  const handleSelectCategory = useCallback(
    async (id) => {
      await formik.setFieldValue(name, id)
      toggleDropdownVisible()
    },
    [formik, name, toggleDropdownVisible]
  )

  return {
    hasError,
    errorMessage,
    toggleDropdownVisible,
    value,
    isDropdownVisible,
    groupedPromptCategories,
    handleSelectCategory,
    isDisabled
  }
}
