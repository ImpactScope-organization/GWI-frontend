import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPrompt, testPrompt, updatePrompt } from '../api/PromptApi'
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

  const getForm = useCallback(({ name, category, prompt, file }) => {
    const formData = new FormData()

    formData.append('name', name)
    formData.append('category', category)
    formData.append('prompt', prompt)
    formData.append('file', file)

    return formData
  }, [])

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
        const testResult = await testPrompt(getForm(values))
        setOutput(testResult?.result)
      } catch (error) {
        setOutput('Error submitting form: ' + error)
      }
    },
    [getForm]
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
