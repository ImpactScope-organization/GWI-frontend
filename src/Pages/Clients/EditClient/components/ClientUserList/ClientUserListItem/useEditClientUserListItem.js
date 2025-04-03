import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useFillFormik } from '../../../../../../Hooks/useFillFormik'
import { useCallback } from 'react'
import { toast } from 'react-toastify'
import { updateClientUser } from '../../../../api/ClientUserApi/ClientUserApi'
import { useListClientUsers } from '../../../../api/ClientUserApi/ClientUserApiQuery'

export const useEditClientUserListItem = ({ clientUser }) => {
  const { refetchClientUsers } = useListClientUsers()

  const editClientUserListItemFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordAgain: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string(),
      passwordAgain: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    }),
    onSubmit: async (values) => {
      await handleEditClientUserListItem(values)
    }
  })
  const { resetFormikFilled } = useFillFormik(editClientUserListItemFormik, clientUser)

  const handleEditClientUserListItem = useCallback(
    async (clientUserForm) => {
      try {
        await updateClientUser({
          ...clientUser,
          ...clientUserForm
        })
        toast.success(`Client user ${clientUser.email} saved successfully`)
        await refetchClientUsers()
        editClientUserListItemFormik.resetForm()
        resetFormikFilled()
      } catch (error) {
        console.error('Error submitting form:', error)
        toast.error('Error submitting form:', error)
      }
    },
    [clientUser, editClientUserListItemFormik, refetchClientUsers, resetFormikFilled]
  )

  return {
    editClientUserListItemFormik
  }
}
