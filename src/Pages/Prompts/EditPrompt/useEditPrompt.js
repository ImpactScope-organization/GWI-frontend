import { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPrompt, testExistingPrompt, updatePrompt } from '../api/PromptApi'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export const useEditPrompt = () => {
  const { id } = useParams()

  const {
    data: prompt,
    isInitialLoading,
    refetch
  } = useQuery({
    queryKey: ['getPrompt', id],
    queryFn: () => getPrompt(id)
  })

  const [output, setOutput] = useState(undefined)

  const handleSubmit = useCallback(
    async ({ category, name, prompt }) => {
      try {
        await updatePrompt(id, {
          category,
          name,
          prompt
        })
        await refetch()
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [id, refetch]
  )

  const handleTest = useCallback(
    async (values) => {
      setOutput('Loading...')
      try {
        const testResult = await testExistingPrompt(id, values)
        setOutput(testResult?.result)
      } catch (error) {
        setOutput('Error submitting form: ' + error)
      }
    },
    [id]
  )

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      prompt: '',
      file: null
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      category: Yup.string().required('Category is required'),
      prompt: Yup.string().required('Prompt is required')
    }),
    onSubmit: async (values) => {
      await handleSubmit(values)
    }
  })

  const [isFormikFilled, setIsFormikFilled] = useState(false)

  const formikRef = useRef(formik)

  useEffect(() => {
    if (prompt && !isFormikFilled) {
      formikRef.current.setValues(prompt)

      setIsFormikFilled(true)
    }
  }, [formikRef, isFormikFilled, prompt])

  return {
    output,
    handleTest,
    formik,
    isFormikFilled
  }
}
