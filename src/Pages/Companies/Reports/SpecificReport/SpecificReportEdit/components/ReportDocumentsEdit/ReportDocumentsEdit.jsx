import React, { useMemo } from 'react'
import { useCurrentCompanyReport } from '../../../hooks/useCurrentCompanyReport'
import { useAccessContext } from '../../../../../../../Context/AccessContext'
import { ReportDetailsCard } from '../../../components/ReportDetailsCard/ReportDetailsCard'
import { ReportDocumentEditItem } from './components/ReportDocumentEditItem'
export const ReportDocumentsEdit = () => {
  const { currentCompanyReport } = useCurrentCompanyReport()

  const {
    userRoles: { isAdmin, isRegulator }
  } = useAccessContext()

  const regulatorDocuments = useMemo(
    () => currentCompanyReport?.documents?.filter((document) => document.type !== 'merge'),
    [currentCompanyReport]
  )

  return (
    <ReportDetailsCard title="Documents">
      <div className="flex gap-2 flex-col">
        {isAdmin &&
          currentCompanyReport?.documents?.map((document) => (
            <ReportDocumentEditItem
              key={document._id}
              name={document.name}
              s3Path={document.s3Path}
            />
          ))}
        {isRegulator &&
          regulatorDocuments?.map((document) => (
            <ReportDocumentEditItem key={document._id} name={document.name} />
          ))}
        {currentCompanyReport?.documents?.length === 0 && currentCompanyReport?.fileName && (
          <ReportDocumentEditItem name={currentCompanyReport?.fileName} />
        )}
      </div>
    </ReportDetailsCard>
  )
}
