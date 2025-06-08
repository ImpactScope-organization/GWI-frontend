import { CreateReportContainer } from '../components/CreateReportContainer'
import { Form, FormikProvider } from 'formik'
import { InputText } from '../../../../../Components/Fields/InputText'
import React from 'react'
import { SuccessButton } from '../../../../../Components/Buttons/SuccessButton'
import { useCreateDynamicReport } from './useCreateDynamicReport'
import { CompanyDocumentInput } from '../../components/CompanyDocumentInput/CompanyDocumentInput'
import { ReportPlatformSelectInput } from '../../components/ReportPlatformSelectInput/ReportPlatformSelectInput'
import { ReportTwitterYearSelectInput } from '../../components/ReportTwitterYearSelectInput/ReportTwitterYearSelectInput'

export const CreateDynamicReport = () => {
  const { createDynamicReportFormik, isLoading, selectedPlatforms } = useCreateDynamicReport()

  return (
    <CreateReportContainer>
      <div className="pb-10">
        <FormikProvider value={createDynamicReportFormik}>
          <Form>
            <div className="w-full flex flex-col gap-4">
              <InputText name="title" label="Report title" />
              <ReportPlatformSelectInput name="platforms" />

              {selectedPlatforms?.document && <CompanyDocumentInput name="documents" />}
              {selectedPlatforms?.twitter && <ReportTwitterYearSelectInput name="twitterYears" />}

              <SuccessButton isLoading={isLoading} onClick={createDynamicReportFormik.submitForm}>
                Create report
              </SuccessButton>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </CreateReportContainer>
  )
}
