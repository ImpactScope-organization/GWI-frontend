import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input } from 'antd'
import { useEditPromptSubCategoriesForm } from './useEditPromptSubCategoriesForm'
import { SubCategoryEditListItem } from './components/SubCategoryEditListItem'

export const EditPromptSubCategoriesForm = () => {
  const {
    newCategoryName,
    onCategoryNameChange,
    addSubCategory,
    subCategories,
    refetchSubCategories
  } = useEditPromptSubCategoriesForm()

  return (
    <div className="w-full">
      <h2 className="text-darkBlack font-bold text-xl mb-4">Sub Categories</h2>
      <div>
        <div className="bg-red-400 relative">
          <div className={`w-full bg-white rounded absolute mt-2 z-10`}>
            <div className="pb-1 w-full flex gap-2">
              <Input
                placeholder="New category"
                value={newCategoryName}
                onChange={onCategoryNameChange}
              />
              <Button type="default" icon={<PlusOutlined />} onClick={addSubCategory}>
                Add item
              </Button>
            </div>
            <Divider className="my-2" />
            <div>
              {subCategories &&
                subCategories.map((item) => (
                  <SubCategoryEditListItem
                    key={item.id}
                    item={item}
                    refetchCategoryItems={refetchSubCategories}
                    toggleDropdownVisible={() => {}}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
