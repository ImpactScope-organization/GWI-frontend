import React from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { CategorySelectOptionItem } from '../../../../Prompts/components/CategorySelect/components/CategorySelectOptionItem'
import { Button, Divider, Input } from 'antd'
import { useEditPromptCategoriesChildrenForm } from './useEditPromptCategoriesChildrenForm'

export const EditPromptCategoriesChildrenForm = () => {
  const {
    newCategoryName,
    onCategoryNameChange,
    addSubCategory,
    subCategories,
    refetchSubCategories
  } = useEditPromptCategoriesChildrenForm()

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
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="default" icon={<PlusOutlined />} onClick={addSubCategory}>
                Add item
              </Button>
            </div>
            <Divider className="my-2" />
            <div>
              {subCategories &&
                subCategories.map((item) => (
                  <CategorySelectOptionItem
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
