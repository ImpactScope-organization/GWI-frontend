import { useFormikContext } from 'formik'
import { useGetCompanyDocuments } from '../../../../../../api/CompanyApiQuery'
import { useCallback, useMemo, useState } from 'react'

export const useCompanyDocumentInput = ({ name }) => {
  const formik = useFormikContext()

  const { companyDocuments } = useGetCompanyDocuments()
  const [year, setYear] = useState()
  const [yearDocument, setYearDocument] = useState()

  console.log(formik.values[name])

  const flattenedCompanyDocuments = useMemo(() => {
    return companyDocuments?.reduce((acc, { documents }) => acc.concat(documents), [])
  }, [companyDocuments])

  const yearDocuments = useMemo(() => {
    return (
      companyDocuments
        ?.find((document) => document.year === year)
        ?.documents?.sort((a, b) => a.reportType.localeCompare(b.reportType)) || []
    )
  }, [companyDocuments, year])

  const handleAddDocument = useCallback(() => {
    const companyDocument = flattenedCompanyDocuments.find(
      (document) => document.documentId === yearDocument
    )
    const documentToAdd = {
      name: `${companyDocument.year}_${companyDocument.reportType}.xlsx`,
      type: 'reportDocument',
      documentId: yearDocument, // todo add this to database
      s3Path: companyDocument.files.find((file) => file.type === 'scoresFile')?.s3Path
    }

    formik.setFieldValue(name, formik.values[name].concat(documentToAdd))
    setYearDocument(undefined)
  }, [flattenedCompanyDocuments, formik, name, yearDocument])

  const handleRemoveDocument = useCallback(
    (documentIdToRemove) => {
      formik.setFieldValue(
        name,
        formik.values[name].filter(({ documentId }) => documentId !== documentIdToRemove)
      )
    },
    [formik, name]
  )

  const hasDocuments = useMemo(() => formik.values[name]?.length > 0, [formik.values, name])

  return {
    flattenedCompanyDocuments,
    hasDocuments,
    companyDocuments,
    yearDocuments,
    yearDocument,
    setYear,
    setYearDocument,
    handleAddDocument,
    handleRemoveDocument
  }
}
