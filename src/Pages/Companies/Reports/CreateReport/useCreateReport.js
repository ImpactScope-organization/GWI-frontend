import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { createReportQueueItem } from '../api/ReportQueueApi'
import { useNavigate } from 'react-router-dom'
import { getRouteWithId, ROUTES } from '../../../../routes'
import { useLoading } from '../../../../Hooks/useLoading'

export const useCreateReport = () => {
  const navigate = useNavigate()

  const { startLoading, finishLoading, isLoading } = useLoading()

  const getForm = useCallback(({ file }) => {
    const formData = new FormData()

    formData.append('file', file)

    return formData
  }, [])

  const handleSubmit = useCallback(
    async (values) => {
      startLoading()
      try {
        const {
          result: { id }
        } = await createReportQueueItem(getForm(values))

        toast.success('Report saved successfully')

        navigate(getRouteWithId(ROUTES.reports.processingDetails, id))
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error(`Error submitting form: ${error.response?.data?.message || error.message}`)
      } finally {
        finishLoading()
      }
    },
    [finishLoading, getForm, navigate, startLoading]
  )

  const formik = useFormik({
    initialValues: {
      file: null
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required('File is required')
    }),
    onSubmit: async (values) => {
      await handleSubmit(values)
    }
  })

  return { formik, isLoading }
}
