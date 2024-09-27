import { Link } from 'react-router-dom'
import { getRouteWithId, ROUTES } from '../../routes'
import { handleDateFormat } from '../../utils/date'
import React from 'react'

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
        data?.map((report, sheetIndex) => (
          <Link
            to={getRouteWithId(ROUTES.specificReport, report?.id)}
            key={sheetIndex}
            style={{
              boxShadow:
                ' 0px 13px 12px -16px rgba(0, 0, 0, 0.05), 0px 0px 12px 0px rgba(0, 0, 0, 0.1)'
            }}
            className="min-w-[31%] p-4 cursor-pointer rounded-xl border border-borderLight  hover:border-black  "
          >
            <p className="mb-2 text-sm text-[#6C7275]">{handleDateFormat(report?.createdAt)}</p>
            <h1 className="mb-3 text-darkBlack text-2xl font-semibold">{report?.companyName}</h1>
            <p className="text-[#6C7275] mt-[16px] text-[14px] mr-3 font-medium">
              Jurisdiction :
              <span className="text-darkBlack font-semibold ml-2">{report?.jurisdiction}</span>
            </p>
          </Link>
        ))}
    </>
  )
}
