import React from 'react'
import LoadingPage from '../../../../../Components/loading'
import { BackButtonLink } from '../../../../../Components/BackButtonLink/BackButtonLink'
import { PageContainer } from '../../../../../Components/Page/PageContainer/PageContainer'
import { useCurrentCompanyReport } from '../hooks/useCurrentCompanyReport'
import { useSpecificReportURL } from './hooks/useSpecificReportURL'
import { useSpecificReportEditFormik } from './hooks/useSpecificReportEditFormik'
import { Form, FormikProvider } from 'formik'
import { EditQualitativeReportDetails } from './containers/EditQualitativeReportDetails/EditQualitativeReportDetails'
import { EditQuantitativeReportDetails } from './containers/EditQuantitativeReportDetails/EditQuantitativeReportDetails'
import { EditReportNavigation } from './containers/EditReportNavigation/EditReportNavigation'
import { EditQuantitativeReportComponents } from './containers/EditQuantitativeReportComponents/EditQuantitativeReportComponents'
import { ReportDocumentsEdit } from './components/ReportDocumentsEdit/ReportDocumentsEdit'

export const SpecificReportEdit = () => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()

  const { specificReportURL } = useSpecificReportURL()

  const { editSpecificReportFormik } = useSpecificReportEditFormik()

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }

  return (
    <PageContainer>
      <FormikProvider value={editSpecificReportFormik}>
        <Form>
          <div className="flex justify-between items-center gap-8 mb-8">
            <div className="w-1/3 lg:w-2/3">
              <BackButtonLink to={specificReportURL} />
            </div>
            <div className="w-2/3 lg:w-1/3">
              <EditReportNavigation />
            </div>
          </div>

          <div id="report-container" className="flex flex-col-reverse lg:flex-row gap-8 mx-auto">
            <div className="w-full lg:w-2/3">
              <EditQualitativeReportDetails />
            </div>
            <div className="w-full lg:w-1/3">
              <div className="flex flex-col gap-8">
                <EditQuantitativeReportDetails />

                {editSpecificReportFormik.values.quantitativePercentages.map(
                  (quantitativePercentageCategory, index) => {
                    return (
                      <EditQuantitativeReportComponents
                        key={quantitativePercentageCategory.id}
                        quantitativePercentageCategory={quantitativePercentageCategory}
                        quantitativePercentageCategoryIndex={index}
                      />
                    )
                  }
                )}

                <ReportDocumentsEdit />
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </PageContainer>
  )
}
