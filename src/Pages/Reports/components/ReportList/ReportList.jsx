import React from 'react'
import { getRouteWithId, ROUTES } from '../../../../routes'
import { handleDateFormat } from '../../../../utils/date'
import { ReportListItemLink } from '../../../../Components/ReportListItemLink/ReportListItemLink'

export const ReportList = ({ data }) => {
  return (
    <>
      {!data ||
        (data?.length === 0 && (
          <h1 className="w-[calc(100vw-100px text-center)]">
            No records found. Please add a new company.
          </h1>
        ))}
      {data &&
        data?.length > 0 &&
        data?.map((report) => (
          <ReportListItemLink
            to={getRouteWithId(ROUTES.specificReport.index, report?.id)}
            key={`report_list_item_${report?.id}`}
          >
            <p className="mb-2 text-sm text-[#6C7275]">{handleDateFormat(report?.createdAt)}</p>
            <h1 className="mb-3 text-darkBlack text-2xl font-semibold">{report?.companyName}</h1>
            <p className="text-[#6C7275] mt-[16px] text-[14px] mr-3 font-medium">
              Jurisdiction :
              <span className="text-darkBlack font-semibold ml-2">{report?.jurisdiction}</span>
            </p>
          </ReportListItemLink>
        ))}
    </>
  )
}
