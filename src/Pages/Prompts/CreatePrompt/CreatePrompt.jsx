import React from 'react'
import { useCreatePrompt } from './useCreatePrompt'
import { PromptContainer } from '../components/PromptContainer'
import { PromptForm } from '../components/PromptForm'
import { FormikProvider } from 'formik'

export const CreatePrompt = () => {
  const { output, handleTest, formik } = useCreatePrompt()

  return (
    <FormikProvider value={formik}>
      <PromptContainer title="Add new prompt">
        <PromptForm output={output} handleTest={handleTest} />
      </PromptContainer>
    </FormikProvider>
  )
}
