import { useFormikContext } from 'formik'
import { Input, Select } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

export const InputB2CRole = ({ name, disabled = false }) => {
  const formik = useFormikContext()
  const [b2cRole, setB2CRole] = useState(undefined)

  const definedRoles = useMemo(
    () => [
      { value: 'individual', label: 'Individual' },
      { value: 'public_company', label: 'Public company' },
      { value: 'private_company', label: 'Private company' },
      { value: 'service_provider', label: 'Service provider' }
    ],
    []
  )

  const isDefinedRole = useCallback(
    (value) => {
      return definedRoles.some(({ value: roleValue }) => roleValue === value)
    },
    [definedRoles]
  )

  useEffect(() => {
    if (!b2cRole) {
      setB2CRole(formik.values[name])
    }
  }, [b2cRole, formik.values, name])

  const setRole = useCallback(
    async (value) => {
      if (isDefinedRole(value) || value === 'other') {
        setB2CRole(value)
      }
      await formik.setFieldValue(name, value)
    },
    [formik, isDefinedRole, name]
  )

  const roles = [...definedRoles, { value: 'other', label: 'Other' }]

  const isOtherInputVisible = useMemo(
    () => !isDefinedRole(formik.values[name]),
    [formik.values, isDefinedRole, name]
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
