import React, { useRef, useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Divider, Input, Select, Space } from 'antd'
let index = 0

export const CategorySelect = ({ formik }) => {
  const [items, setItems] = useState(['jack', 'lucy'])
  const [name, setName] = useState('')
  const inputRef = useRef(null)
  const onNameChange = (event) => {
    setName(event.target.value)
  }
  const addItem = (e) => {
    e.preventDefault()
    setItems([...items, name || `New item ${index++}`])
    setName('')
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="text-md text-darkBlack mb-1 font-semibold block">
        Category
      </label>
      <Select
        className="w-full"
        placeholder="Category"
        dropdownRender={(menu) => (
          <div className="w-full p-2">
            {menu}
            <Divider className="my-2" />
            <div className="pb-1 w-full flex gap-2">
              <Input
                placeholder="New category"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />

              <Button type="default" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </div>
          </div>
        )}
        options={items.map((item) => ({
          label: item,
          value: item
        }))}
      />
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
