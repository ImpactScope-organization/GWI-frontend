import React, { useCallback, useMemo, useState } from 'react'
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Select } from 'antd'
import { createPromptCategory, getPromptCategories } from './categorySelectApi'
import { useQuery } from '@tanstack/react-query'
import { CategorySelectOptionItem } from './components/CategorySelectOptionItem'
import { useFormikContext } from 'formik'

export const CategorySelect = ({ name }) => {
  const formik = useFormikContext()
  const [isDropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdownVisible = useCallback(() => {
    setDropdownVisible(!isDropdownVisible)
  }, [isDropdownVisible])

  const [newCategoryName, setNewCategoryName] = useState('')
  const hasError = formik.touched[name] && formik.errors[name]

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

  const value = useMemo(() => {
    return formik.values[name]
      ? categoryItems.find(({ id }) => id === formik.values[name])?.name
      : 'Select a category or create a new one'
  }, [categoryItems, formik.values, name])

  return (
    <div className="w-full">
      <label htmlFor={newCategoryName} className="text-md text-darkBlack mb-1 font-semibold block">
        Category
      </label>
      <div>
        <div
          className={`w-full bg-[#f5f4f4] border ${hasError ? 'border-[#ff0000]' : 'border-[#d9d9d9]'} rounded-md p-4 hover:border-primary cursor-pointer flex items-center justify-between`}
          onClick={toggleDropdownVisible}
        >
          <span>{value}</span>
          <CaretDownOutlined />
        </div>
        <div className="bg-red-400 relative">
          {isDropdownVisible && (
            <div className={`w-full bg-white rounded absolute mt-2 z-10 p-4 shadow-lg border`}>
              <div>
                {categoryItems &&
                  categoryItems.map((item) => (
                    <CategorySelectOptionItem
                      key={item.id}
                      item={item}
                      refetchCategoryItems={refetchCategoryItems}
                      formik={formik}
                    />
                  ))}
              </div>

              <Divider className="my-2" />
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
            </div>
          )}
        </div>
      </div>
      {/*<Select*/}
      {/*  className="w-full"*/}
      {/*  placeholder="Category"*/}
      {/*  defaultValue={formik.values[name]}*/}
      {/*  dropdownRender={(menu) => (*/}
      {/*    <div className="w-full p-2">*/}
      {/*      {menu}*/}
      {/*      <Divider className="my-2" />*/}
      {/*      <div className="pb-1 w-full flex gap-2">*/}
      {/*        <Input*/}
      {/*          placeholder="New category"*/}
      {/*          value={newCategoryName}*/}
      {/*          onChange={onCategoryNameChange}*/}
      {/*          onKeyDown={(e) => e.stopPropagation()}*/}
      {/*        />*/}
      {/*        <Button type="default" icon={<PlusOutlined />} onClick={addCategoryItem}>*/}
      {/*          Add item*/}
      {/*        </Button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  onChange={(value) => {*/}
      {/*    formik.setFieldValue(name, value)*/}
      {/*  }}*/}
      {/*  onBlur={formik.handleBlur}*/}
      {/*  value={formik.values[newCategoryName]}*/}
      {/*  status={*/}
      {/*    formik.touched[newCategoryName] && formik.errors[newCategoryName] ? 'error' : 'success'*/}
      {/*  }*/}
      {/*  options={categoryItems.map((item) => ({*/}
      {/*    label: item.name,*/}
      {/*    value: item.id*/}
      {/*  }))}*/}
      {/*  optionRender={(item) => (*/}
      {/*    <CategorySelectOptionItem item={item} refetchCategoryItems={refetchCategoryItems} />*/}
      {/*  )}*/}
      {/*/>*/}
      <div className="ml-1">
        {formik.touched[newCategoryName] && formik.errors[newCategoryName] ? (
          <div className="text-[#ff0000]">{formik.errors[newCategoryName]}</div>
        ) : null}
      </div>
    </div>
  )
}
