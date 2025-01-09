import {
  deletePromptCategory,
  updatePromptCategory
} from '../../../../PromptCategories/api/PromptCategoryApi'
import { CloseCircleOutlined, EditOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { Formik, useFormikContext } from 'formik'
import { useCallback, useState } from 'react'
import { InputText } from '../../../../../Components/Fields/InputText'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import * as Yup from 'yup'

export const CategoryEditSelectOptionItem = ({
  item,
  refetchCategoryItems,
  toggleDropdownVisible
}) => {
  const formik = useFormikContext()
  const [isEdit, setIsEdit] = useState(false)
  const [{ confirm }, modalContent] = Modal.useModal()

  const toggleEditInput = useCallback(() => {
    setIsEdit(!isEdit)
  }, [isEdit])

  const handleUpdate = useCallback(
    async (newName) => {
      await updatePromptCategory(item.id, { name: newName })
      await refetchCategoryItems()
      toggleEditInput()
    },
    [item.id, refetchCategoryItems, toggleEditInput]
  )

  const handleDelete = useCallback(async () => {
    confirm({
      title: `Do you want to delete "${item.name}" category?`,
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be reverted',
      async onOk() {
        await deletePromptCategory(item.id)
        await refetchCategoryItems()
      }
    })
  }, [item, confirm, refetchCategoryItems])

  const handleClick = useCallback(async () => {
    await formik.setFieldValue('category', item.id)
    toggleDropdownVisible()
  }, [formik, item, toggleDropdownVisible])

  return (
    <div className={`flex justify-between gap-2 ${isEdit && `bg-amber-100 -mx-4 px-4 -my-2 py-2`}`}>
      {!isEdit && (
        <div
          className="w-full hover:bg-primary hover:text-white p-2 rounded cursor-pointer"
          onClick={handleClick}
        >
          <div>{item.name}</div>
        </div>
      )}
      {isEdit && (
        <Formik
          initialValues={{ updateName: item.name }}
          onSubmit={async (values, { resetForm }) => {
            await handleUpdate(values.updateName)
            resetForm()
          }}
          validationSchema={Yup.object({
            updateName: Yup.string().required('Name is required')
          })}
        >
          {({ submitForm, errors }) => (
            <div className="w-full flex gap-2 items-end justify-between">
              <InputText name="updateName" label="Category name" />

              <div className={`basis-1/3 ${errors.updateName ? 'mb-6' : 'mb-0'}`}>
                <SuccessButton onClick={submitForm}>Update</SuccessButton>
              </div>
            </div>
          )}
        </Formik>
      )}
      <EditOutlined className="hover:text-yellow-400" onClick={() => toggleEditInput()} />
      <CloseCircleOutlined className="hover:text-red-400" onClick={() => handleDelete()} />
      {modalContent}
    </div>
  )
}
