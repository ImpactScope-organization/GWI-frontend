import React, { useEffect, useState } from 'react'
import { useEditPrompt } from './useEditPrompt'
import { PromptContainer } from '../components/PromptContainer'
import { PromptForm } from '../components/PromptForm'
import { getInitialForm } from '../forms/getInitialForm'
import { useQuery } from '@tanstack/react-query'
import { getPrompt } from '../api/PromptApi'
import { useParams } from 'react-router-dom'

export const EditPrompt = () => {
  const { output, handleSubmit, handleTest } = useEditPrompt()

  const { formik } = getInitialForm(handleSubmit)

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

  console.log(isInitialLoading)

  useEffect(() => {
    if (prompt && !isInitialLoading && !isFormikFilled) {
      formik.initialValues = {
        name: prompt.name,
        category: prompt.category,
        prompt: prompt.prompt,
        file: prompt.file
      }
      setIsFormikFilled(true)
    }
  }, [formik, isFormikFilled, isInitialLoading, prompt])

  console.log(formik)

  return (
    <PromptContainer>
      {!isFormikFilled ? (
        'Loading...'
      ) : (
        <PromptForm
          output={output}
          handleSubmit={handleSubmit}
          handleTest={handleTest}
          formik={formik}
        />
      )}
    </PromptContainer>
  )
}
