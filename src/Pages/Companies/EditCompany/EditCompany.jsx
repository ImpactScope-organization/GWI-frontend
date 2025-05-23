import { TitleWithBackButton } from '../../../Components/TitleWithBackButton/TitleWithBackButton'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../Components/Fields/InputText'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'
import { CheckSquareFilled } from '@ant-design/icons'
import React from 'react'
import { useEditCompany } from './useEditCompany'
import { useGetCompany } from '../api/CompanyApiQuery'
import { useAccessContext } from '../../../Context/AccessContext'
import { InputArrayText } from '../../../Components/Fields/InputArrayText'

export const EditCompany = () => {
  const { companyId, company } = useGetCompany()
  const { editCompanyFormik } = useEditCompany()
  const { getCompanyRouteByRole } = useAccessContext()

  return (
    <TitleWithBackButton
      title={`Edit ${company?.name}`}
      to={getCompanyRouteByRole({
        companyId
      })}
    >
      <FormikProvider value={editCompanyFormik}>
        <div className="flex flex-col w-full gap-4 lg:flex-row">
          <Form className="flex flex-col gap-4 w-full">
            <div className="flex flex-col lg:w-2/3 xl:w-1/2 gap-4">
              <div className="flex flex-col w-full gap-4">
                <InputText name="name" label="Name" />
                <InputText name="companyId" label="Company Id" />
                <InputArrayText name="twitterURLs" label="Twitter URLs" />
                <InputText name="isin" label="ISIN" />
                <InputText name="jurisdiction" label="Jurisdiction" />
                <InputText name="sector" label="Sector" />
                <InputText name="annualRevenue" label="Annual Revenue" />
                <InputText name="noOfEmployees" label="Employees" />
                <InputText name="GHGEmissions" label="GHG emissions" />
              </div>

              <div className="flex w-full gap-4">
                <SuccessButton onClick={editCompanyFormik.submitForm} icon={<CheckSquareFilled />}>
                  Save company
                </SuccessButton>
              </div>
            </div>
          </Form>
        </div>
      </FormikProvider>
    </TitleWithBackButton>
  )
}
