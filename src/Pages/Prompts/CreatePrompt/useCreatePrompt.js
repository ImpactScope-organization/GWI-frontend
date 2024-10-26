import { useFormik } from 'formik'
import * as Yup from 'yup'
import { message } from 'antd'
import { useCallback, useState } from 'react'
import axios from 'axios'
import apiUrl from '../../../utils/baseURL'

export const useCreatePrompt = () => {
  const [isLoading, setIsLoading] = useState(false) // todo loading context
  const [output, setOutput] = useState(undefined)

  const handleUpload = (fileList) => {
    const formData = new FormData()
    fileList.forEach((file) => {
      formData.append('files[]', file)
    })
    setIsLoading(true)
    // You can use any AJAX library you like
    fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then(() => {
        // setFileList([])
        message.success('upload successfully.')
      })
      .catch(() => {
        message.error('upload failed.')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

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
        console.log(response)
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
      await handleFileUploadPromptRequest(`${apiUrl}/api/prompt/test`, values)
    },
    [handleFileUploadPromptRequest]
  )

  return {
    output,
    handleSubmit,
    handleTest
  }
}
