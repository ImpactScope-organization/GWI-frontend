import { Select } from 'antd'
import { CategorySelectGroupTitle } from '../../../../../../Prompts/components/CategorySelect/components/CategorySelectGroupTitle'
import { SuccessButton } from '../../../../../../../Components/Buttons/SuccessButton'
import { TagWithClose } from '../../../../../../../Components/TagWithClose/TagWithClose'
import { useCompanyDocumentInput } from './useCompanyDocumentInput/useCompanyDocumentInput'
import React from 'react'
import { useFormikContext } from 'formik'

export const CompanyDocumentInput = ({ name }) => {
  const formik = useFormikContext()

  const {
    hasDocuments,
    companyDocuments,
    yearDocuments,
    yearDocument,
    setYear,
    setYearDocument,
    handleAddDocument,
    handleRemoveDocument
  } = useCompanyDocumentInput({ name })

  return (
    <div className="flex flex-col w-full gap-4">
      <div>
        <CategorySelectGroupTitle>Select Documents</CategorySelectGroupTitle>
        <div className="w-full flex gap-4">
          <Select
            className="w-full"
            onChange={(yearToSet) => {
              setYear(yearToSet)
              setYearDocument(undefined)
            }}
          >
            {companyDocuments &&
              companyDocuments.map(({ year }) => (
                <Select.Option key={`company_document_${year}`} value={year}>
                  {year}
                </Select.Option>
              ))}
          </Select>
          <Select
            className="w-full"
            onChange={(yearDocumentToSet) => {
              setYearDocument(yearDocumentToSet)
            }}
            value={yearDocument}
          >
            {yearDocuments &&
              yearDocuments.map(({ documentId, reportType }) => (
                <Select.Option key={`company_documet_${documentId}`} value={documentId}>
                  {reportType}
                </Select.Option>
              ))}
          </Select>
          <div>
            <SuccessButton onClick={handleAddDocument}>Add</SuccessButton>
          </div>
        </div>
      </div>
      <div>
        <CategorySelectGroupTitle>Documents</CategorySelectGroupTitle>
        <div className="bg-gray-100 p-4 rounded-lg">
          {hasDocuments ? (
            <div className="flex gap-4">
              {formik.values[name].map(({ name, documentId }) => {
                return (
                  <div key={`company_document_tag_${documentId}`}>
                    <TagWithClose tag={name} onClose={() => handleRemoveDocument(documentId)} />
                  </div>
                )
              })}
            </div>
          ) : (
            <div>No documents selected, use the inputs to select a document or more.</div>
          )}
          {formik.touched[name] && formik.errors[name] ? (
            <div className="text-[#ff0000]">{formik.errors[name]}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
