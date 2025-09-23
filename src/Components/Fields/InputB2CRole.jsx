import { useFormikContext } from 'formik'
import { Input, Select } from 'antd'

export const InputB2CRole = ({ name, label, disabled = false }) => {
  const optionOther = 'other'

  const roles = [
    { value: 'public_company', label: 'Public company' },
    { value: 'private_company', label: 'Private company' },
    { value: 'individual', label: 'Individual' },
    { value: 'service_provider', label: 'Service provider' },
    { value: optionOther, label: 'Other' }
  ]

  const formik = useFormikContext()
  return (
    <div className="w-full">
      <label className="text-md text-darkBlack mb-1 font-semibold block">
        I am registering on behalf of a
      </label>
      <Select
        name={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        disabled={disabled}
        className="w-full"
      >
        {roles.map((role) => (
          <Select.Option key={`option_${role.value}`} value={role.value}>
            {role.label}
          </Select.Option>
        ))}
      </Select>

      {formik.values[name] === optionOther && <Input />}
      <div className="ml-1">
        {formik.touched[name] && formik.errors[name] ? (
          <div className="text-[#ff0000]">{formik.errors[name]}</div>
        ) : null}
      </div>
    </div>
  )
}
