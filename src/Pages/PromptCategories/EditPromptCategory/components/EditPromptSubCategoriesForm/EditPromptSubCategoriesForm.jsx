import React from 'react'
import { CheckSquareOutlined } from '@ant-design/icons'
import { Divider, Input } from 'antd'
import { useEditPromptSubCategoriesForm } from './useEditPromptSubCategoriesForm'
import { SubCategoryEditListItem } from './components/SubCategoryEditListItem'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'

export const EditPromptSubCategoriesForm = () => {
  const {
    subCategoryName,
    onSubCategoryNameChange,
    createSubCategory,
    subCategories,
    refetchSubCategories
  } = useEditPromptSubCategoriesForm()

  return (
    <div className="w-full">
      <h2 className="text-darkBlack font-bold text-xl mb-4">Sub Categories</h2>
      <div className="pb-1 w-full flex gap-2">
        <div className="w-4/5">
          <Input placeholder="Name" value={subCategoryName} onChange={onSubCategoryNameChange} />
        </div>
        <div className="w-1/5">
          <SuccessButton icon={<CheckSquareOutlined />} onClick={createSubCategory}>
            Create sub category
          </SuccessButton>
        </div>
      </div>
      <Divider className="my-2" />
      <div>
        {subCategories &&
          subCategories.map((subCategory) => (
            <SubCategoryEditListItem
              key={subCategory.id}
              subCategory={subCategory}
              refetchSubCategories={refetchSubCategories}
            />
          ))}
      </div>
    </div>
  )
}
