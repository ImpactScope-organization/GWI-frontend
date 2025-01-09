import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { createPromptCategory } from '../../api/PromptCategoryApi'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { getUrlWithParameters } from '../../../../utils/route'
import { ROUTES } from '../../../../routes'

export const useCreatePromptCategory = () => {
  const navigate = useNavigate()

  const createPromptCategoryFormik = useFormik({
    initialValues: {
      name: '',
      isQuantitative: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required')
    }),
    onSubmit: async (values) => {
      await handleCreatePromptCategory(values)
    }
  })

  const handleCreatePromptCategory = useCallback(
    async (promptCategory) => {
      try {
        const {
          result: { id }
        } = await createPromptCategory(promptCategory)
        toast.success('Prompt saved successfully')
        navigate(getUrlWithParameters(ROUTES.promptCategories.edit, { id }))
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [navigate]
  )

  return {
    createPromptCategoryFormik
  }
}
