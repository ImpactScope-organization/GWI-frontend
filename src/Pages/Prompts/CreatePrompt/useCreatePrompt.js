import { useCallback, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/baseURL'
import { useNavigate } from 'react-router-dom'
import { createPromptCategory, testPromptCategory } from '../api/PromptApi'

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
        const { result } = await createPromptCategory(getForm(values))

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
        const testResult = await testPromptCategory(getForm(values))
        setOutput(testResult?.result)
      } catch (error) {
        setOutput('Error submitting form: ' + error)
      }
    },
    [getForm]
  )

  return {
    output,
    handleSubmit,
    handleTest
  }
}
