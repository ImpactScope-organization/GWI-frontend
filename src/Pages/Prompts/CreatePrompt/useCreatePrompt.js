import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPrompt, testPrompt } from '../api/PromptApi'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const useCreatePrompt = () => {
  const navigate = useNavigate()

  const [output, setOutput] = useState(undefined)

  const getForm = useCallback(({ name, category, prompt, file }) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('category', category)
    formData.append('prompt', prompt)
    formData.append('file', file)

    return formData
  }, [])

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { result } = await createPrompt(getForm(values))

        navigate(`/prompts/${result.id}/edit`)
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [getForm, navigate]
  )

  const handleTest = useCallback(
    async (values) => {
      setOutput('Loading...')
      try {
        const testResult = await testPrompt(getForm(values))
        setOutput(testResult?.result)
      } catch (error) {
        setOutput('Error submitting form: ' + error)
      }
    },
    [getForm]
  )

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      prompt: '',
      file: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      category: Yup.string().required('Category is required'),
      prompt: Yup.string().required('Prompt is required'),
      file: Yup.mixed().required('File is required')
    }),
    onSubmit: async (values) => {
      await handleSubmit(values)
    }
  })

  return {
    output,
    handleTest,
    formik
  }
}
