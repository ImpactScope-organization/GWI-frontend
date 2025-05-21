import { useCallback } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../../../../Hooks/useFillFormik'
import { toast } from 'react-toastify'
import { useCurrentCompanyReport } from '../../hooks/useCurrentCompanyReport'
import { updateReport } from '../../../api/ReportApi'

export const useSpecificReportEditFormik = () => {
  const { getCurrentCompanyReport, reportId, currentCompanyReport } = useCurrentCompanyReport()

  const getCompanyReportFieldLabel = useCallback(
    (fieldName) => {
      return fieldName
        .replace(/\[(\d+)\]/g, '.$1') // Convert [0] to .0
        .replace('value', 'name')
        .split('.')
        .reduce(
          (nestedObject, property) => (nestedObject ? nestedObject[property] : undefined),
          currentCompanyReport
        )
    },
    [currentCompanyReport]
  )
  const editSpecificReportFormik = useFormik({
    initialValues: {
      contradiction: '',
      unsubstantiatedClaims: '',
      greenwashRiskPercentage: 0,
      reportingRiskPercentage: 0,
      title: '',
      jurisdiction: '',
      sector: '',
      annualRevenue: '',
      noOfEmployees: '',
      GHGEmissions: '',
      quantitativePercentages: []
    },
    validationSchema: Yup.object({
      contradiction: Yup.string().required(),
      unsubstantiatedClaims: Yup.string().required(),
      greenwashRiskPercentage: Yup.number().max(100).min(0),
      reportingRiskPercentage: Yup.number().max(100).min(0),
      title: Yup.string().required(),
      jurisdiction: Yup.string().required(),
      sector: Yup.string().required(),
      annualRevenue: Yup.string().required(),
      noOfEmployees: Yup.string().required(),
      GHGEmissions: Yup.string().required(),

      quantitativePercentages: Yup.array().of(
        Yup.object().shape({
          id: Yup.string().required(),
          name: Yup.string().required(),
          value: Yup.number().min(0).max(100),
          components: Yup.array()
            .of(
              Yup.object().shape({
                id: Yup.string().required(),
                name: Yup.string().required(),
                value: Yup.number()
                  .min(0, ({ path }) => `${getCompanyReportFieldLabel(path)} must be at least 0`)
                  .max(100, ({ path }) => `${getCompanyReportFieldLabel(path)} must be at most 100`)
                  .required(({ path }) => `${getCompanyReportFieldLabel(path)} is a required field`)
              })
            )
            .required('Quantitative percentage components are required')
        })
      )
    }),
    onSubmit: async (values) => {
      await handleUpdateReport(values)
    }
  })

  const { resetFormikFilled } = useFillFormik(editSpecificReportFormik, currentCompanyReport)

  const handleUpdateReport = useCallback(
    async (currentCompanyReportForm) => {
      try {
        await updateReport(reportId, currentCompanyReportForm)
        await getCurrentCompanyReport()
        resetFormikFilled()
        toast.success('Report saved successfully')
      } catch (error) {
        console.error('Error submitting form:', error)
      }
    },
    [getCurrentCompanyReport, reportId, resetFormikFilled]
  )

  return {
    editSpecificReportFormik
  }
}
