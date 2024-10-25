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
    <div className="mb-4">
      <label htmlFor={name} className="text-md text-darkBlack mb-1 font-semibold block">
        Category
      </label>
      <Select
        style={{
          width: '100%'
        }}
        placeholder="custom dropdown render"
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider
              style={{
                margin: '8px 0'
              }}
            />
            <Space
              style={{
                padding: '0 8px 4px'
              }}
            >
              <Input
                placeholder="Please enter item"
                ref={inputRef}
                value={name}
                onChange={onNameChange}
                onKeyDown={(e) => e.stopPropagation()}
              />
              <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                Add item
              </Button>
            </Space>
          </>
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
