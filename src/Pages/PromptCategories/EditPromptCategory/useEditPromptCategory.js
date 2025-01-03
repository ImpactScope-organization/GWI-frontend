import { useQuery } from '@tanstack/react-query'
import { getPromptCategory } from '../api/PromptCategoryApi'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../Hooks/useFillFormik'

export const useEditPromptCategory = () => {
  const { id } = useParams()

  const {
    data: { result: promptCategory }
  } = useQuery({
    queryKey: ['getPromptCategory', id],
    queryFn: () => getPromptCategory(id),
    initialData: {
      result: undefined
    }
  })

  const editPromptCategoryFormik = useFormik({
    initialValues: {
      name: '',
      isNumeric: false
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required')
    }),
    onSubmit: async (values) => {
      await handleSubmit(values)
    }
  })

  const { isFormikFilled, setIsFormikFilled } = useFillFormik(
    editPromptCategoryFormik,
    promptCategory
  )

  const handleSubmit = async (values) => {
    console.log(values)
  }

  return {
    promptCategory,
    editPromptCategoryFormik
  }
}
