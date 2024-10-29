import React from 'react'
import { useEditPrompt } from './useEditPrompt'
import { PromptContainer } from '../components/PromptContainer'
import { PromptForm } from '../components/PromptForm'
import { FormikProvider } from 'formik'

export const EditPrompt = () => {
  const { output, formik, handleTest, isFormikFilled } = useEditPrompt()

  return (
    <FormikProvider value={formik}>
      <PromptContainer>
        {!isFormikFilled ? (
          'Loading...'
        ) : (
          <PromptForm output={output} handleTest={handleTest} formik={formik} />
        )}
      </PromptContainer>
    </FormikProvider>
  )
}
