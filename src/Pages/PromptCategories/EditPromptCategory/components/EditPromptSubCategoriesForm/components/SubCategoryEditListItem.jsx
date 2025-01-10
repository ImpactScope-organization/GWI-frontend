import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { Formik } from 'formik'
import { useCallback } from 'react'
import * as Yup from 'yup'
import { deletePromptCategory, updatePromptCategory } from '../../../../api/PromptCategoryApi'
import { InputText } from '../../../../../../Components/Fields/InputText'
import { DangerButton } from '../../../../../../Components/Buttons/DangerButton'
import { EditButton } from '../../../../../../Components/Buttons/EditButton'
import { toast } from 'react-toastify'

export const SubCategoryEditListItem = ({ subCategory: { id, name }, refetchSubCategories }) => {
  const [{ confirm }, modalContent] = Modal.useModal()

  const handleUpdate = useCallback(
    async (newName) => {
      await updatePromptCategory(id, { name: newName })
      await refetchSubCategories()
      toast.success('Sub category updated successfully')
    },
    [id, refetchSubCategories]
  )

  const handleDelete = useCallback(async () => {
    confirm({
      title: `Do you want to delete "${name}" sub category?`,
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be reverted',
      async onOk() {
        await deletePromptCategory(id)
        await refetchSubCategories()
        toast.success('Sub category deleted successfully')
      }
    })
  }, [confirm, id, name, refetchSubCategories])

  return (
    <Formik
      initialValues={{ updateName: name }}
      onSubmit={async (values, { resetForm }) => {
        await handleUpdate(values.updateName)
        resetForm()
      }}
      validationSchema={Yup.object({
        updateName: Yup.string().required('Name is required')
      })}
      enableReinitialize
    >
      {({ submitForm, errors, touched }) => (
        <div className={`flex justify-between gap-2 py-2 hover:bg-green-100`}>
          <div
            className={`w-full flex gap-2 justify-between ${errors?.updateName && touched?.updateName ? `items-center` : `items-end`}`}
          >
            <InputText name="updateName" />
            <EditButton onClick={() => submitForm()}>Update</EditButton>
            <DangerButton onClick={() => handleDelete()}>Delete</DangerButton>
          </div>
          {modalContent}
        </div>
      )}
    </Formik>
  )
}
