import { useFormik } from 'formik'
import * as Yup from 'yup'
import { message } from 'antd'
import { useState } from 'react'

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

  return {
    output
  }
}
