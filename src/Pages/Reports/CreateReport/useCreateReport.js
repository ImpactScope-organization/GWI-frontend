import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { createPrompt } from '../../Prompts/api/PromptApi'
import { toast } from 'react-toastify'

export const useCreateReport = () => {
  const getForm = useCallback(({ file }) => {
    const formData = new FormData()

    formData.append('file', file)

    return formData
  }, [])

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const {
          result: { id }
        } = await createPrompt(getForm(values))

        toast.success('Prompt saved successfully')
        console.log(id)
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [getForm]
  )

  const formik = useFormik({
    initialValues: {
      file: null
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required('File is required')
    }),
    onSubmit: async (values) => {
      await handleSubmit(values)
    }
  })

  return { formik }
}
