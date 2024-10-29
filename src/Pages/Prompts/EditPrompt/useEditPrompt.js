import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createPrompt, getPrompt, testPrompt } from '../api/PromptApi'
import { useInitFormik } from '../forms/useInitFormik'
import { useQuery } from '@tanstack/react-query'

export const useEditPrompt = () => {
  const navigate = useNavigate()

  const [output, setOutput] = useState(undefined)

  const getForm = useCallback(({ name, category, prompt, file }) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('category', category)
    formData.append('prompt', prompt)
    formData.append('file', file)

    return formData
  }, [])

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const { result } = await createPrompt(getForm(values))

        navigate(`/prompts/${result.id}/edit`)
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [getForm, navigate]
  )

  const handleTest = useCallback(
    async (values) => {
      setOutput('Loading...')
      try {
        const testResult = await testPrompt(getForm(values))
        setOutput(testResult?.result)
      } catch (error) {
        setOutput('Error submitting form: ' + error)
      }
    },
    [getForm]
  )

  const { formik } = useInitFormik(handleSubmit)

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
      formik.setValues(prompt)

      setIsFormikFilled(true)
    }
  }, [formik, isFormikFilled, isInitialLoading, prompt])

  return {
    output,
    handleTest,
    formik,
    isFormikFilled
  }
}
