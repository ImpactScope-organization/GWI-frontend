export const B2C_ROLES = {
  INDIVIDUAL: 'individual',
  PUBLIC_COMPANY: 'public_company',
  PRIVATE_COMPANY: 'private_company',
  SERVICE_PROVIDER: 'service_provider',
  OTHER: 'other'
}
export const DEFINED_B2C_ROLES_WITH_LABEL = [
  { value: B2C_ROLES.INDIVIDUAL, label: 'Individual' },
  { value: B2C_ROLES.PUBLIC_COMPANY, label: 'Public company' },
  { value: B2C_ROLES.PRIVATE_COMPANY, label: 'Private company' },
  { value: B2C_ROLES.SERVICE_PROVIDER, label: 'Service provider' }
]

export const B2C_OTHER_ROLE = { value: B2C_ROLES.OTHER, label: 'Other' }

export const B2C_ROLES_WITH_LABEL_AND_OPTION_OTHER = [
  ...DEFINED_B2C_ROLES_WITH_LABEL,
  B2C_OTHER_ROLE
]
