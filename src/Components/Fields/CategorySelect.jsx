import React, { useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Select } from 'antd'
let index = 0

export const CategorySelect = ({ formik, name }) => {
  const [items, setItems] = useState(['jack', 'lucy', 'hello'])
  const [category, setCategory] = useState('')
  const inputRef = useRef(null)
  const onNameChange = (event) => {
    setCategory(event.target.value)
  }
  const addItem = (e) => {
    e.preventDefault()
    setItems([...items, category || `New item ${index++}`])
    setCategory('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <div className="mb-4 w-full">
      <label htmlFor={category} className="text-md text-darkBlack mb-1 font-semibold block">
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
                value={category}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />

              <Button type="default" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </div>
          </div>
        )}
        onChange={(value) => {
          formik.setFieldValue(name, value)
        }}
        onBlur={formik.handleBlur}
        value={formik.values[category]}
        status={formik.touched[category] && formik.errors[category] ? 'error' : 'success'}
        options={items.map((item) => ({
          label: item,
          value: item
        }))}
      />
      <div className="ml-1">
        {formik.touched[category] && formik.errors[category] ? (
          <div className="text-[#ff0000]">{formik.errors[category]}</div>
        ) : null}
      </div>
    </div>
  )
}
