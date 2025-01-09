import React from 'react'
import { PromptForm } from '../components/PromptForm'
import { FormikProvider } from 'formik'
import { EditPromptContainer } from '../components/EditPromptContainer'
import { useEditPrompt } from './context/EditPromptContext'

export const EditPrompt = () => {
  const { output, formik, handleTest, isFormikFilled, modalContent } = useEditPrompt()

  return (
    <FormikProvider value={formik}>
      <EditPromptContainer>
        {!isFormikFilled ? (
          'Loading...'
        ) : (
          <PromptForm output={output} handleTest={handleTest} edit={true} />
        )}
      </EditPromptContainer>
      {modalContent}
    </FormikProvider>
  )
}
