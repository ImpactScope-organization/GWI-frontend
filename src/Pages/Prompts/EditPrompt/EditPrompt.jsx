import React from 'react'
import { useEditPrompt } from './useEditPrompt'
import { PromptForm } from '../components/PromptForm'
import { FormikProvider } from 'formik'
import { EditPromptContainer } from '../components/EditPromptContainer'

export const EditPrompt = () => {
  const { output, formik, handleTest, isFormikFilled, handleDelete, modalContent } = useEditPrompt()

  return (
    <FormikProvider value={formik}>
      <EditPromptContainer title={formik.values?.name} onDelete={handleDelete}>
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
