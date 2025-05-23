import { Input } from 'antd'
import React, { useCallback, useMemo, useState } from 'react'
import { useFormikContext } from 'formik'
import { SuccessButton } from '../Buttons/SuccessButton'
import { TagWithClose } from '../TagWithClose/TagWithClose'

export const InputArrayText = ({ name, label, disabled = false }) => {
  const [value, setValue] = useState('')

  const formik = useFormikContext()

  const formikValues = useMemo(() => formik.values[name] || [], [])

  const addItem = useCallback(() => {
    if (value.trim() === '') return
    const newValues = [...formikValues, value]
    formik.setFieldValue(name, newValues)
    setValue('')
  }, [formik, formikValues, name, value])

  const removeItem = useCallback(
    (indexToRemove) => {
      const newValues = formikValues.filter((_, index) => index !== indexToRemove)
      formik.setFieldValue(name, newValues)
    },
    [formik, formikValues, name]
  )

  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">{label}</label>
      <div className="relative mb-4">
        <Input
          name={name}
          placeholder={'Add new item'}
          type="text"
          onChange={(e) => setValue(e.target.value)}
          onBlur={formik.handleBlur}
          value={value}
          status={formik.touched[name] && formik.errors[name] ? 'error' : 'success'}
          disabled={disabled}
        />
        <SuccessButton type="button" onClick={addItem} rootClassName="absolute top-0 right-0 w-24">
          Add
        </SuccessButton>
      </div>
      <div className="flex flex-col gap-4">
        {formikValues.map((item, index) => (
          <TagWithClose
            key={`input_array_item_${name}_${index}`}
            tag={item}
            onClose={() => removeItem(index)}
          />
        ))}
      </div>
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
