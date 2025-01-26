import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { createReportQueueItem } from '../api/ReportQueueApi'
import { useNavigate } from 'react-router-dom'
import { getRouteWithId, ROUTES } from '../../../routes'

export const useCreateReport = () => {
  const navigate = useNavigate()

  const getForm = useCallback(({ file }) => {
    const formData = new FormData()

    formData.append('file', file)

    return formData
  }, [])

  const handleSubmit = useCallback(
    async (values) => {
      try {
        const {
          result: { id }
        } = await createReportQueueItem(getForm(values))

        toast.success('Report saved successfully')

        navigate(getRouteWithId(ROUTES.reports.processingDetails, id))
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error(`Error submitting form: ${error.response?.data?.message || error.message}`)
      }
    },
    [getForm, navigate]
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

  return { formik }
}
