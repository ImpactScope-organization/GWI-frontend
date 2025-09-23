import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { useLoading } from '../../../Hooks/useLoading'
import { getApi } from '../../../utils/api'
import { ROUTES } from '../../../routes'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
  const { isLoading, startLoading, finishLoading } = useLoading()
  const navigate = useNavigate()

  const registerFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordAgain: '',
      b2cRole: 'individual',
      name: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      passwordAgain: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        startLoading()

        await (await getApi()).post(`/api/b2c/register`, values)
        toast.success('User created successfully!')
        navigate(ROUTES.login)
      } catch (err) {
        toast.error(err?.response?.data?.message)
      } finally {
        finishLoading()
      }
    }
  })

  return {
    registerFormik,
    isLoading
  }
}
