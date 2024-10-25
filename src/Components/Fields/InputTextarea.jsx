import React from 'react'
import { Input } from 'antd'

const { TextArea } = Input

export const InputTextarea = ({ formik, name, label }) => (
  <div className="mb-4">
    <label htmlFor="name" className="text-md text-darkBlack mb-1 font-semibold block">
      {label}
    </label>
    <TextArea
      id={name}
      name={name}
      placeholder={label}
      type="text"
      className="p-4 bg-[#f5f4f4] rounded-lg border-none focus:outline-none mb-1"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[name]}
      status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
    />
    <div className="ml-1">
      {formik.touched[name] && formik.errors[name] ? (
        <div className="text-[#ff0000]">{formik.errors[name]}</div>
      ) : null}
    </div>
  </div>
)
