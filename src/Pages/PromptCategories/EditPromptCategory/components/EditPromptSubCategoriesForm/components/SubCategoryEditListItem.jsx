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
import { InputNumber } from '../../../../../../Components/Fields/InputNumber'

export const SubCategoryEditListItem = ({
  subCategory: { id, name, score, weight, divider },
  refetchSubCategories
}) => {
  const [{ confirm }, modalContent] = Modal.useModal()

  const handleUpdate = useCallback(
    async (values) => {
      await updatePromptCategory(id, values)
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
    <tr className="hover:bg-green-100">
      <Formik
        initialValues={{ updateName: name, score, weight, divider }}
        onSubmit={async (values, { resetForm }) => {
          await handleUpdate(values)
          resetForm()
        }}
        validationSchema={Yup.object({
          updateName: Yup.string().required('Name is required'),
          score: Yup.number().required('Score is required'),
          weight: Yup.number().required('Weight is required'),
          divider: Yup.number().required('Divider is required')
        })}
        enableReinitialize
      >
        {({ submitForm }) => (
          <>
            <td className="pr-2">
              <InputText name="updateName" />
            </td>
            <td className="pr-2">
              <InputNumber name="score" />
            </td>
            <td className="pr-2">
              <InputNumber name="weight" />
            </td>
            <td className="pr-2">
              <InputNumber name="divider" />
            </td>
            <td className="flex gap-2 py-4 justify-end">
              <EditButton onClick={() => submitForm()}>Update</EditButton>
              <DangerButton onClick={() => handleDelete()}>Delete</DangerButton>
            </td>

            {modalContent}
          </>
        )}
      </Formik>
    </tr>
  )
}
