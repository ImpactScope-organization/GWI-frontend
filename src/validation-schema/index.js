import * as Yup from 'yup'

export const loginModalScehma = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()

    .required('Password is required')
})
