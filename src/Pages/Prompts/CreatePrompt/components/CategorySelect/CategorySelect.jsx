import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Select } from 'antd'
import {
  createPromptCategory,
  deletePromptCategory,
  getPromptCategories,
  updatePromptCategory
} from './categorySelectApi'
import { useQuery } from '@tanstack/react-query'
import ReportService from '../../../../../Services/reports-services'

export const CategorySelect = ({ formik, name }) => {
  const [newCategoryName, setNewCategoryName] = useState('')
  const inputRef = useRef(null)

  const { data: categoryItems, refetch } = useQuery({
    queryKey: ['getPromptCategories'],
    queryFn: () => getPromptCategories(),
    initialData: []
  })

  const onNameChange = (event) => {
    setNewCategoryName(event.target.value)
  }

  const addCategoryItem = useCallback(
    async (e) => {
      e.preventDefault()
      await createPromptCategory(newCategoryName)
      await refetch()
      setNewCategoryName('')
    },
    [newCategoryName, refetch]
  )

  const handleUpdate = async (id, newName) => {
    const updatedCategory = await updatePromptCategory(id, newName)
    await refetch()
  }

  const handleDelete = async (id) => {
    await deletePromptCategory(id)
    await refetch()
  }

  return (
    <div className="w-full">
      <label htmlFor={newCategoryName} className="text-md text-darkBlack mb-1 font-semibold block">
        Category
      </label>
      <Select
        className="w-full"
        placeholder="Category"
        defaultValue={formik.values[name]}
        dropdownRender={(menu) => (
          <div className="w-full p-2">
            {menu}
            <Divider className="my-2" />
            <div className="pb-1 w-full flex gap-2">
              <Input
                placeholder="New category"
                ref={inputRef}
                value={newCategoryName}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="default" icon={<PlusOutlined />} onClick={addCategoryItem}>
                Add item
              </Button>
            </div>
          </div>
        )}
        onChange={(value) => {
          formik.setFieldValue(name, value)
        }}
        onBlur={formik.handleBlur}
        value={formik.values[newCategoryName]}
        status={
          formik.touched[newCategoryName] && formik.errors[newCategoryName] ? 'error' : 'success'
        }
        options={categoryItems.map((item) => ({
          label: item.name,
          value: item.id
        }))}
      />
      <div className="ml-1">
        {formik.touched[newCategoryName] && formik.errors[newCategoryName] ? (
          <div className="text-[#ff0000]">{formik.errors[newCategoryName]}</div>
        ) : null}
      </div>
    </div>
  )
}
