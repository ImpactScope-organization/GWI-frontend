import { Input } from 'antd'
import React from 'react'
import { useFormikContext } from 'formik'

export const SpecificReportInputText = ({ name, label }) => {
  const formik = useFormikContext()

  return (
    <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
      <p className="text-reportGrey text-[1em] text-base font-medium">{label}</p>
      <Input
        variant="borderless"
        id={name}
        name={name}
        placeholder={label}
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
        className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
      />
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
