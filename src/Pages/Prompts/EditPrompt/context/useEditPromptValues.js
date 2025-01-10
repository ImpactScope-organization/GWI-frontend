import { useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deletePrompt, getPrompt, testExistingPrompt, updatePrompt } from '../../api/PromptApi'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { ROUTES } from '../../../../routes'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useFillFormik } from '../../../../Hooks/useFillFormik'
import { setDefaultPrompt } from '../../api/DefaultPromptApi'

export const useEditPromptValues = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [{ confirm }, modalContent] = Modal.useModal()

  const { data: prompt, refetch: refetchPrompt } = useQuery({
    queryKey: ['getPrompt', id],
    queryFn: () => getPrompt(id)
  })

  const [output, setOutput] = useState(undefined)

  const formik = useFormik({
    initialValues: {
      name: '',
      category: '',
      prompt: '',
      file: null,
      file_update: null
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

  const { isFormikFilled, resetFormikFilled } = useFillFormik(formik, prompt)

  const handleSubmit = useCallback(
    async ({ name, category, prompt, file_update }) => {
      try {
        await updatePrompt(id, {
          category,
          name,
          prompt,
          file_update
        })
        await refetchPrompt()
        resetFormikFilled()
        toast.success('Prompt saved successfully')
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [id, refetchPrompt, resetFormikFilled]
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

  const handleSetAsCategoryDefault = useCallback(async () => {
    confirm({
      title: `Do you want to set "${formik?.values.name}" prompt as category default?`,
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be reverted. The previous category default will be overwritten.',
      async onOk() {
        try {
          await setDefaultPrompt({ promptId: prompt.id, promptCategoryId: prompt.category })
          toast.success('Category default set successfully')
          await refetchPrompt()
        } catch (error) {
          toast.error('Error setting prompt as category default')
          console.error('Error setting prompt as category default:', error)
        }
      }
    })
  }, [confirm, formik?.values.name, prompt, refetchPrompt])

  return {
    prompt,
    output,
    handleTest,
    formik,
    isFormikFilled,
    handleDelete,
    modalContent,
    handleSetAsCategoryDefault
  }
}
