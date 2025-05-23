import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { createCompany } from '../api/CompanyApi'
import { useAuthContext } from '../../../Context/AuthContext'

export const useCreateCompany = () => {
  const navigate = useNavigate()
  const { getCompanyRouteByRole } = useAuthContext()

  const createCompanyFormik = useFormik({
    initialValues: {
      name: '',
      companyId: '',
      isin: '',
      twitterURLs: [],
      jurisdiction: '',
      sector: '',
      annualRevenue: '',
      noOfEmployees: '',
      GHGEmissions: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      companyId: Yup.string().required(),
      isin: Yup.string().required(),
      twitterURLs: Yup.array().of(Yup.string()),
      jurisdiction: Yup.string().required(),
      sector: Yup.string().required(),
      annualRevenue: Yup.string().required(),
      noOfEmployees: Yup.string().required(),
      GHGEmissions: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleCreateCompany(values)
    }
  })

  const handleCreateCompany = useCallback(
    async (company) => {
      try {
        const {
          result: { companyId }
        } = await createCompany(company)
        toast.success('Company saved successfully')
        navigate(getCompanyRouteByRole({ companyId }))
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [getCompanyRouteByRole, navigate]
  )

  return {
    createCompanyFormik
  }
}
