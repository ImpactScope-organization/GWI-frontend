import React from 'react'
import { useCreatePrompt } from './useCreatePrompt'
import { PromptForm } from '../components/PromptForm'
import { FormikProvider } from 'formik'
import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { ROUTES } from '../../../routes'

export const CreatePrompt = () => {
  const { output, handleTest, formik } = useCreatePrompt()

  return (
    <FormikProvider value={formik}>
      <TitleWithBackButton title="Create new prompt" to={ROUTES.prompts.index}>
        <PromptForm output={output} handleTest={handleTest} />
      </TitleWithBackButton>
    </FormikProvider>
  )
}
