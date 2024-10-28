import React from 'react'
import { useCreatePrompt } from './useCreatePrompt'
import { PromptContainer } from '../components/PromptContainer'
import { PromptForm } from '../components/PromptForm'
import * as Yup from 'yup'

export const CreatePrompt = () => {
  const { output, handleSubmit, handleTest } = useCreatePrompt()

  const formik = {
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
  }

  return (
    <PromptContainer>
      <PromptForm
        output={output}
        handleSubmit={handleSubmit}
        handleTest={handleTest}
        formik={formik}
      />
    </PromptContainer>
  )
}
