import { useFormikContext } from 'formik'
import { Input, Select } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

const definedRoles = ['public_company', 'private_company', 'individual', 'service_provider']

export const InputB2CRole = ({ name, disabled = false }) => {
  const formik = useFormikContext()
  const [b2cRole, setB2CRole] = useState(undefined)

  useEffect(() => {
    if (!b2cRole) {
      setB2CRole(formik.values[name])
    }
  }, [b2cRole, formik.values, name])

  const setRole = useCallback(
    async (value) => {
      if (definedRoles.includes(value) || value === 'other') {
        setB2CRole(value)
      }
      await formik.setFieldValue(name, value)
    },
    [formik, name]
  )

  const roles = [
    { value: 'public_company', label: 'Public company' },
    { value: 'private_company', label: 'Private company' },
    { value: 'individual', label: 'Individual' },
    { value: 'service_provider', label: 'Service provider' },
    { value: 'other', label: 'Other' }
  ]

  const isOtherInputVisible = useMemo(
    () => !definedRoles.includes(formik.values[name]),
    [formik.values, name]
  )

  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">
        I am registering on behalf of a
      </label>
      <div className="flex flex-col gap-2">
        <Select
          name={name}
          onSelect={setRole}
          onBlur={formik.handleBlur}
          value={b2cRole}
          disabled={disabled}
          className="w-full"
        >
          {roles.map((role) => (
            <Select.Option key={`option_${role.value}`} value={role.value}>
              {role.label}
            </Select.Option>
          ))}
        </Select>

        {isOtherInputVisible && <Input onChange={(e) => setRole(e.target.value)} />}
      </div>
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
