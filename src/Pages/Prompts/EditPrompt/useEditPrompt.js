import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePrompt, getPrompt, testExistingPrompt, updatePrompt } from '../api/PromptApi'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { ROUTES } from '../../../routes'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'

export const useEditPrompt = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [{ confirm }, modalContent] = Modal.useModal()

  const { data: prompt, refetch } = useQuery({
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
        toast.success('Prompt saved successfully')
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
        toast.success('Test completed successfully')
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

  const handleDelete = useCallback(async () => {
    confirm({
      title: `Do you want to delete "${formik?.values.name}" prompt?`,
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be reverted',
      async onOk() {
        try {
          await deletePrompt(id)
          toast.success('Deletion successful')
          navigate(ROUTES.prompts.index)
        } catch (error) {
          toast.error('Error deleting prompt')
          console.error('Error deleting prompt:', error)
        }
      }
    })
  }, [confirm, formik?.values.name, id, navigate])

  return {
    output,
    handleTest,
    formik,
    isFormikFilled,
    handleDelete,
    modalContent
  }
}
