import { useGetCompanyDocuments } from '../../../api/CompanyApiQuery'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { createDocumentReportQueueItem } from '../../api/ReportQueueApi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getRouteWithParams, ROUTES } from '../../../../../routes'
import { useLoading } from '../../../../../Hooks/useLoading'

export const useCreateDocumentReport = () => {
  const { companyDocuments } = useGetCompanyDocuments()
  const { companyId } = useParams()
  const navigate = useNavigate()
  const { startLoading, finishLoading, isLoading } = useLoading()

  const createDocumentReportFormik = useFormik({
    initialValues: {
      title: '',
      documents: []
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      documents: Yup.array().min(1).required()
    }),
    async onSubmit(values) {
      startLoading()
      // const {
      //   result: { id }
      // } = await createDocumentReportQueueItem({
      //   ...values,
      //   companyId
      // })
      //
      // finishLoading()
      //
      // toast.success('Report saved successfully')
      // navigate(
      //   getRouteWithParams(ROUTES.companies.reports.processingDetails, {
      //     companyId,
      //     reportQueueId: id
      //   })
      // )
    }
  })

  return { companyDocuments, createDocumentReportFormik, isLoading }
}
