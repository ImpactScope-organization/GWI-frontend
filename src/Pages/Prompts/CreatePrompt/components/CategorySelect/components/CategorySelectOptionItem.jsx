import { deletePromptCategory, updatePromptCategory } from '../categorySelectApi'
import { CloseCircleOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import { useFormikContext } from 'formik'
const { confirm } = Modal

export const CategorySelectOptionItem = ({ item, refetchCategoryItems }) => {
  const formik = useFormikContext()
  const handleUpdate = async (id, newName) => {
    const updatedCategory = await updatePromptCategory(id, newName)
    await refetchCategoryItems()
  }

  const handleDelete = async () => {
    confirm({
      title: `Do you want to delete "${item.name}" category?`,
      icon: <ExclamationCircleFilled />,
      content: 'This action cannot be reverted',
      async onOk() {
        await deletePromptCategory(item.id)
        await refetchCategoryItems()
      }
    })
  }

  return (
    <div className="flex justify-between gap-2">
      <div
        className="w-full hover:bg-primary hover:text-white p-2 rounded cursor-pointer"
        onClick={() => formik.setFieldValue('category', item.id)}
      >
        <div>{item.name}</div>
      </div>
      <CloseCircleOutlined className="hover:text-red-400" onClick={() => handleDelete()} />
    </div>
  )
}
