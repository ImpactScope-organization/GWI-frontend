import { useFormikContext } from 'formik'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { B2C_ROLES, DEFINED_B2C_ROLES_WITH_LABEL } from './b2cRoles'

export const useInputB2CRole = ({ name }) => {
  const formik = useFormikContext()
  const [b2cRole, setB2CRole] = useState(undefined)

  const isDefinedRole = useCallback((value) => {
    return DEFINED_B2C_ROLES_WITH_LABEL.some(({ value: roleValue }) => roleValue === value)
  }, [])

  useEffect(() => {
    if (!b2cRole) {
      setB2CRole(formik.values[name])
    }
  }, [b2cRole, formik.values, name])

  const setRole = useCallback(
    async (value) => {
      if (isDefinedRole(value) || value === B2C_ROLES.OTHER) {
        setB2CRole(value)
      }
      await formik.setFieldValue(name, value)
    },
    [formik, isDefinedRole, name]
  )

  const isOtherInputVisible = useMemo(
    () => !isDefinedRole(formik.values[name]),
    [formik.values, isDefinedRole, name]
  )

  return {
    b2cRole,
    setRole,
    isOtherInputVisible
  }
}
