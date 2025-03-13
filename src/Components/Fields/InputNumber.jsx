import { InputNumber as InputNumberAntd } from 'antd'
import React from 'react'
import { useFormikContext } from 'formik'

export const InputNumber = ({ name, label }) => {
  const formik = useFormikContext()
  return (
    <div className="w-full">
      <label htmlFor={name} className="text-md text-darkBlack mb-1 font-semibold block">
        {label}
      </label>
      <InputNumberAntd
        id={name}
        controls={false}
        name={name}
        placeholder={label}
        className="w-full"
        type="number"
        onChange={(value) => {
          if (value !== null) {
            formik.setFieldValue(name, value)
          }
        }}
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
