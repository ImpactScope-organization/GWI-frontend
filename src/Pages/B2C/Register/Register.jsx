import { AuthPageContainer } from '../../../Components/Page/AuthPageContainer/AuthPageContainer'
import { useRegister } from './useRegister'
import { InputText } from '../../../Components/Fields/InputText'
import { Form, FormikProvider } from 'formik'
import { InputPassword } from '../../../Components/Fields/InputPassword'
import { FilledSuccessButton } from '../../../Components/Buttons/FilledSuccessButton'
import { InputB2CRole } from '../../../Components/Fields/InputB2CRole/InputB2CRole'
import React from 'react'
import { Select } from 'antd'

export const Register = () => {
  const { registerFormik, isLoading } = useRegister()
  const { companyType } = registerFormik.values

  return (
    <AuthPageContainer subTitle="Sign up and let's get started">
      <FormikProvider value={registerFormik}>
        <Form>
          <div className="w-full mt-5 space-y-5">
            <InputText name="name" label="Name" />
            <InputText name="email" label="E-mail" />
            <InputPassword name="password" label="Password" />
            <InputPassword name="confirmPassword" label="Confirm Password" />
            <InputText name="companyName" label="Company Name" />
            <div>
              <label className="text-md text-darkBlack mb-1 font-semibold block">
                Company Type
              </label>
              <Select
                name="companyType"
                placeholder="Select Company Type"
                optionFilterProp="label"
                onChange={(value) => registerFormik.setFieldValue('companyType', value)}
                status={
                  registerFormik.touched.companyType && registerFormik.errors.companyType
                    ? 'error'
                    : 'success'
                }
                options={[
                  {
                    value: 'financialRegulator',
                    label: 'Financial Regulator'
                  },
                  {
                    value: 'publiclyListedCompany',
                    label: 'Publicly listed company'
                  },
                  {
                    value: 'advertisingWatchdog',
                    label: 'Advertising watchdog'
                  },
                  {
                    value: 'ngo',
                    label: 'NGO'
                  },
                  {
                    value: 'other',
                    label: 'Other'
                  }
                ]}
                className="w-full"
              />
            </div>
            {companyType === 'other' && (
              <InputText name="customCompanyType" label="Custom Company Type" />
            )}
            <InputB2CRole name="b2cRole" />
            <FilledSuccessButton type="submit" isLoading={isLoading}>
              Sign up
            </FilledSuccessButton>
          </div>
        </Form>
      </FormikProvider>
    </AuthPageContainer>
  )
}
