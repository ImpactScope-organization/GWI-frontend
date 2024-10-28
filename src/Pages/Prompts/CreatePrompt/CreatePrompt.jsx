import React from 'react'
import { useCreatePrompt } from './useCreatePrompt'
import { PromptContainer } from '../components/PromptContainer'
import { PromptForm } from '../components/PromptForm'

import { getInitialForm } from '../forms/getInitialForm'

export const CreatePrompt = () => {
  const { output, handleSubmit, handleTest } = useCreatePrompt()
  const { formik } = getInitialForm(handleSubmit)

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
