import { useFormikContext } from 'formik'
import { Input, Select } from 'antd'
import { B2C_ROLES_WITH_LABEL_AND_OPTION_OTHER } from './b2cRoles'
import { useInputB2CRole } from './useInputB2CRole'

export const InputB2CRole = ({ name, disabled = false }) => {
  const formik = useFormikContext()
  const { b2cRole, setRole, isOtherInputVisible } = useInputB2CRole({ name })

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
          {B2C_ROLES_WITH_LABEL_AND_OPTION_OTHER.map((role) => (
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
