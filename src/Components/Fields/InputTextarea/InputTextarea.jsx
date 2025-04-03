import React from 'react'
import { Input } from 'antd'
import { useFormikContext } from 'formik'
import { trimTextarea } from './trimTextarea'

const { TextArea } = Input

export const InputTextarea = ({ name, label }) => {
  const formik = useFormikContext()

  const { onBlur } = formik.getFieldProps(name)

  return (
    <div>
      <label className="text-md text-darkBlack mb-1 font-semibold block">{label}</label>
      <TextArea
        name={name}
        placeholder={label}
        type="text"
        rows={12}
        onChange={formik.handleChange}
        onBlur={(e) => {
          formik.setFieldValue(name, trimTextarea(e.target.value))
          onBlur(e)
        }}
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
