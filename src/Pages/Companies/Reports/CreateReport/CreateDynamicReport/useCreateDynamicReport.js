import { useGetCompanyDocuments } from '../../../api/CompanyApiQuery'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  createDocumentReportQueueItem,
  createDynamicReportQueueItem
} from '../../api/ReportQueueApi'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getRouteWithParams, ROUTES } from '../../../../../routes'
import { useLoading } from '../../../../../Hooks/useLoading'
import { useMemo } from 'react'

export const useCreateDynamicReport = () => {
  const { companyDocuments } = useGetCompanyDocuments()
  const { companyId } = useParams()
  const navigate = useNavigate()
  const { startLoading, finishLoading, isLoading } = useLoading()

  const createDynamicReportFormik = useFormik({
    initialValues: {
      title: '',
      documents: [],
      twitterYears: [],
      platforms: []
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      documents: Yup.array().min(1),
      twitterYears: Yup.array().min(1),
      platforms: Yup.array().min(1).required()
    }),
    async onSubmit(values) {
      console.log(values)
      startLoading()
      const {
        result: { id }
      } = await createDynamicReportQueueItem({
        ...values,
        companyId
      })

      finishLoading()

      toast.success('Report saved successfully')
      // todo handle when backend is ready
      // navigate(
      //   getRouteWithParams(ROUTES.companies.reports.processingDetails, {
      //     companyId,
      //     reportQueueId: id
      //   })
      // )
    }
  })

  // todo platform slugs const

  const selectedPlatforms = useMemo(() => {
    return createDynamicReportFormik.values.platforms.reduce((acc, platform) => {
      acc[platform] = true
      return acc
    }, {})
  }, [createDynamicReportFormik.values.platforms])

  return { companyDocuments, createDynamicReportFormik, isLoading, selectedPlatforms }
}
