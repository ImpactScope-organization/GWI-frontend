import React from 'react'
import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { FormikProvider } from 'formik'
import { useCreateReport } from './useCreateReport'
import { FileInput } from '../../../Components/Fields/FileInput'

const CreateReport = () => {
  const { formik } = useCreateReport()

  return (
    <PageContainer>
      <div className="pb-10">
        <BackButtonLink to={ROUTES.reports.internal} />
        <div className="grid w-full">
          <div className="w-1/2 mx-auto flex justify-center items-center flex-col">
            <h1 className="text-darkBlack font-bold text-3xl leading-[64px] mb-1">
              Add new company
            </h1>
            <p className="subtitle-text ">Add the data source file to get started</p>
            {/* File Upload */}
            <FormikProvider value={formik}>
              <FileInput name="file" accept=".xlsx, .txt" />
            </FormikProvider>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}

export default CreateReport
