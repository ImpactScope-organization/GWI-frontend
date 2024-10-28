import React from 'react'
import { useEditPrompt } from './useEditPrompt'
import { PromptContainer } from '../components/PromptContainer'
import { PromptForm } from '../components/PromptForm'
import { getInitialForm } from '../forms/getInitialForm'

export const EditPrompt = () => {
  const { output, handleSubmit, handleTest } = useEditPrompt()

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
