import React from 'react'
import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { FormikProvider } from 'formik'
import { useCreateReport } from './useCreateReport'
import { FileInput } from '../../../Components/Fields/FileInput'
import { SuccessButton } from '../../../Components/Buttons/SuccessButton'

const CreateReport = () => {
  const { formik, isLoading } = useCreateReport()

  return (
    <PageContainer>
      <div className="pb-10">
        <BackButtonLink to={ROUTES.reports.internal} />
        <div className="grid w-full">
          <div className="w-1/2 mx-auto flex justify-center items-center flex-col">
            <h1 className="text-darkBlack font-bold text-3xl leading-[64px] mb-1">
              Add new company
            </h1>
            <p className="mb-8">
              Add the company source file to add the company to the report queue. <br />
              You will see the processing status after submitting the company.
            </p>
            {/* File Upload */}
            <FormikProvider value={formik}>
              <div className="mb-4 w-full">
                <FileInput name="file" accept=".xlsx" />
              </div>
              <SuccessButton
                isLoading={isLoading}
                disabled={!formik.isValid}
                onClick={formik.submitForm}
              >
                Add new company
              </SuccessButton>
            </FormikProvider>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default CreateReport
