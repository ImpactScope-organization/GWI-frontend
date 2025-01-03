import { useFormikContext } from 'formik'
import React, { useCallback, useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { createPromptCategory, getPromptCategories } from '../../../api/PromptCategoryApi'
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { CategorySelectOptionItem } from '../../../../Prompts/components/CategorySelect/components/CategorySelectOptionItem'
import { Button, Divider, Input } from 'antd'

export const EditPromptCategoriesChildrenForm = () => {
  const formik = useFormikContext()

  const [newCategoryName, setNewCategoryName] = useState('')

  const { data: categoryItems, refetch: refetchCategoryItems } = useQuery({
    queryKey: ['getPromptCategories'],
    queryFn: () => getPromptCategories(),
    initialData: []
  })

  const onCategoryNameChange = (event) => {
    event.preventDefault()
    setNewCategoryName(event.target.value)
  }

  const addCategoryItem = useCallback(
    async (e) => {
      e.preventDefault()
      await createPromptCategory(newCategoryName)
      await refetchCategoryItems()
      setNewCategoryName('')
    },
    [newCategoryName, refetchCategoryItems]
  )

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
              <Button type="default" icon={<PlusOutlined />} onClick={addCategoryItem}>
                Add item
              </Button>
            </div>
            <Divider className="my-2" />
            <div>
              {categoryItems &&
                categoryItems.map((item) => (
                  <CategorySelectOptionItem
                    key={item.id}
                    item={item}
                    refetchCategoryItems={refetchCategoryItems}
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
