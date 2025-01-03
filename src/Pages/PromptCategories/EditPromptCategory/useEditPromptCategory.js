import { useQuery } from '@tanstack/react-query'
import { getPromptCategory, updatePromptCategory } from '../api/PromptCategoryApi'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../Hooks/useFillFormik'
import { useCallback } from 'react'
import { updatePrompt } from '../../Prompts/api/PromptApi'
import { toast } from 'react-toastify'

export const useEditPromptCategory = () => {
  const { id } = useParams()

  const {
    data: { result: promptCategory },
    refetch: refetchPromptCategory
  } = useQuery({
    queryKey: ['getPromptCategory', id],
    queryFn: () => getPromptCategory(id),
    initialData: {
      result: undefined
    }
  })

  const editPromptCategoryFormik = useFormik({
    initialValues: {
      name: '',
      isNumeric: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required')
    }),
    onSubmit: async (values) => {
      await handleSubmitEditPromptCategory(values)
    }
  })

  const { resetFormikFilled } = useFillFormik(editPromptCategoryFormik, promptCategory)

  const handleSubmitEditPromptCategory = useCallback(
    async ({ name }) => {
      try {
        await updatePromptCategory(id, name)
        await refetchPromptCategory()
        resetFormikFilled()
        toast.success('Prompt saved successfully')
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [id, refetchPromptCategory, resetFormikFilled]
  )

  return {
    promptCategory,
    editPromptCategoryFormik
  }
}
