import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { useGetCompany } from '../api/CompanyApiQuery'
import { useFillFormik } from '../../../Hooks/useFillFormik'
import { updateCompany } from '../api/CompanyApi'

export const useEditCompany = () => {
  const { companyId, company, refetchCompany } = useGetCompany()

  const editCompanyFormik = useFormik({
    initialValues: {
      name: '',
      companyId: '',
      twitterURLs: [],
      isin: '',
      jurisdiction: '',
      sector: '',
      annualRevenue: '',
      noOfEmployees: '',
      GHGEmissions: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      companyId: Yup.string().required(),
      twitterURLs: Yup.array().of(Yup.string()),
      isin: Yup.string(), // todo make it required when all companies are able to transfer
      jurisdiction: Yup.string().required(),
      sector: Yup.string().required(),
      annualRevenue: Yup.string().required(),
      noOfEmployees: Yup.string().required(),
      GHGEmissions: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleEditCompany(values)
    }
  })
  const { resetFormikFilled } = useFillFormik(editCompanyFormik, company)

  const handleEditCompany = useCallback(
    async (company) => {
      try {
        await updateCompany(companyId, company)
        toast.success('Company saved successfully')
        await refetchCompany()
        resetFormikFilled()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [companyId, refetchCompany, resetFormikFilled]
  )

  return {
    editCompanyFormik
  }
}
