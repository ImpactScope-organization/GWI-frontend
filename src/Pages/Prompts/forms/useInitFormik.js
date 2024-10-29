import { useFormik } from 'formik'
import * as Yup from 'yup'

export const useInitFormik = (handleSubmit) => {
  return {
    formik: useFormik({
      initialValues: {
        name: '',
        category: '',
        prompt: '',
        file: null
      },
      validationSchema: Yup.object({
        name: Yup.string().required('Name is required'),
        category: Yup.string().required('Category is required'),
        prompt: Yup.string().required('Prompt is required'),
        file: Yup.mixed().required('File is required')
      }),
      onSubmit: async (values) => {
        await handleSubmit(values)
      }
    })
  }
}
