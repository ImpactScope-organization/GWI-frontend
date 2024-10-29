import React, { useEffect, useState } from 'react'
import { useEditPrompt } from './useEditPrompt'
import { PromptContainer } from '../components/PromptContainer'
import { PromptForm } from '../components/PromptForm'
import { useQuery } from '@tanstack/react-query'
import { getPrompt } from '../api/PromptApi'
import { useParams } from 'react-router-dom'
import { FormikProvider } from 'formik'

export const EditPrompt = () => {
  const { output, formik, handleTest } = useEditPrompt()

  const { id } = useParams()

  const [isFormikFilled, setIsFormikFilled] = useState(false)

  const {
    data: prompt,
    refetch,
    isInitialLoading
  } = useQuery({
    queryKey: ['getPrompt', id],
    queryFn: () => getPrompt(id)
  })

  useEffect(() => {
    if (prompt && !isInitialLoading && !isFormikFilled) {
      formik.setFieldValue('name', prompt.name)
      formik.setFieldValue('category', prompt.category)
      formik.setFieldValue('prompt', prompt.prompt)
      formik.setFieldValue('file', prompt.file)

      setIsFormikFilled(true)
    }
  }, [formik, isFormikFilled, isInitialLoading, prompt])

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
