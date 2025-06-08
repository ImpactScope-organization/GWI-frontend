import { useFormikContext } from 'formik'
import { useGetCompanyDocuments } from '../../../../api/CompanyApiQuery'
import { useCallback, useMemo, useState } from 'react'

export const useCompanyDocumentInput = ({ name }) => {
  const formik = useFormikContext()

  const { companyDocuments } = useGetCompanyDocuments()
  const [year, setYear] = useState()
  const [yearDocument, setYearDocument] = useState()

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

  const currentCompanyDocuments = useMemo(() => {
    return (
      flattenedCompanyDocuments?.filter((document) =>
        formik.values[name].includes(document.documentId)
      ) || []
    )
  }, [flattenedCompanyDocuments, formik.values, name])

  const handleAddDocument = useCallback(() => {
    formik.setFieldValue(name, formik.values[name].concat(yearDocument))
    setYearDocument(undefined)
  }, [formik, name, yearDocument])

  const handleRemoveDocument = useCallback(
    (documentId) => {
      formik.setFieldValue(
        name,
        formik.values[name].filter((id) => id !== documentId)
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
    currentCompanyDocuments,
    setYear,
    setYearDocument,
    handleAddDocument,
    handleRemoveDocument
  }
}
