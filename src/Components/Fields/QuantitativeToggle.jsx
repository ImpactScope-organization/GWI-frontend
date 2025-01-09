import { Radio } from 'antd'
import { useFormikContext } from 'formik'
import React from 'react'

export const QuantitativeToggle = ({ name, label }) => {
  const formik = useFormikContext()

  const options = [
    { label: 'Quantitative (yes)', value: true },
    { label: 'Qualitative (no)', value: false }
  ]

  return (
    <div className="w-full">
      <label htmlFor={name} className="text-md text-darkBlack mb-1 font-semibold block">
        {label}
      </label>
      <Radio.Group
        id={name}
        name={name}
        block
        options={options}
        defaultValue={false}
        onChange={formik.handleChange}
        value={formik.values[name]}
        optionType="button"
        buttonStyle="solid"
      />
    </div>
  )
}
