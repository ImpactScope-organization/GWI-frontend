import { useCallback, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/baseURL'
import { useNavigate } from 'react-router-dom'

export const useCreatePrompt = () => {
  const navigate = useNavigate()

  const [output, setOutput] = useState(undefined)

  const handleFileUploadPromptRequest = useCallback(
    async (url, { name, category, prompt, file }) => {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('category', category)
      formData.append('prompt', prompt)
      formData.append('file', file)

      try {
        const response = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    []
  )

  const handleSubmit = useCallback(
    async (values) => {
      const { result } = await handleFileUploadPromptRequest(`${apiUrl}/api/prompt/create`, values)
      navigate(`/prompts/${result.id}/edit`)
    },
    [handleFileUploadPromptRequest, navigate]
  )

  const handleTest = useCallback(
    async (values) => {
      setOutput('Loading...')
      const data = await handleFileUploadPromptRequest(`${apiUrl}/api/prompt/test`, values)
      setOutput(data?.result)
    },
    [handleFileUploadPromptRequest]
  )

  return {
    output,
    handleSubmit,
    handleTest
  }
}
