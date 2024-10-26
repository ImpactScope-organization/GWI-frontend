import React from 'react'
import { Input } from 'antd'
import { useFormikContext } from 'formik'

const { TextArea } = Input

export const InputTextarea = ({ name, label }) => {
  const formik = useFormikContext()
  return (
    <div>
      <label htmlFor="name" className="text-md text-darkBlack mb-1 font-semibold block">
        {label}
      </label>
      <TextArea
        id={name}
        name={name}
        placeholder={label}
        type="text"
        rows={12}
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
}
