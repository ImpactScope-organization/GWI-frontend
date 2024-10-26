import { useFormik } from 'formik'
import * as Yup from 'yup'
import { message } from 'antd'
import { useCallback, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const useCreatePrompt = () => {
  const [isLoading, setIsLoading] = useState(false) // todo loading context
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
      await handleFileUploadPromptRequest(`${apiUrl}/api/prompt/create`, values)
    },
    [handleFileUploadPromptRequest]
  )

  const handleTest = useCallback(
    async (values) => {
      setOutput('Loading...')
      const { result } = await handleFileUploadPromptRequest(`${apiUrl}/api/prompt/test`, values)
      setOutput(result)
    },
    [handleFileUploadPromptRequest]
  )

  return {
    output,
    handleSubmit,
    handleTest
  }
}
