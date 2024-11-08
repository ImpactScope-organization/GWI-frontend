import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPrompt, testPrompt } from '../api/PromptApi'
import { useInitFormik } from '../forms/useInitFormik'
import { toast } from 'react-toastify'

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

        toast.success('Prompt saved successfully')
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
        toast.success('Test completed successfully')
      } catch (error) {
        setOutput('Error submitting form: ' + error)
      }
    },
    [getForm]
  )

  const { formik } = useInitFormik(handleSubmit)

  return {
    output,
    handleTest,
    formik
  }
}
