import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { getUrlWithParameters } from '../../../utils/route'
import { ROUTES } from '../../../routes'

export const useCreateCompany = () => {
  const navigate = useNavigate()

  const createCompanyFormik = useFormik({
    initialValues: {
      name: '',
      companyId: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      companyId: Yup.string().required()
    }),
    onSubmit: async (values) => {
      await handleCreateCompany(values)
    }
  })

  const handleCreateCompany = useCallback(
    async (company) => {
      try {
        console.log(company)
        // const {
        //   result: { id }
        // } = await createPromptCategory(promptCategory)
        const id = '33'
        toast.success('Company saved successfully')
        navigate(getUrlWithParameters(ROUTES.companies.edit, { id }))
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [navigate]
  )

  return {
    createCompanyFormik
  }
}
