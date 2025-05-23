import React from 'react'
import { getRouteWithParams, ROUTES } from '../../../../../routes'
import { handleDateFormat } from '../../../../../utils/date'
import { CategorizedListItemLink } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemDate } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { CategorizedListItemTitle } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'

export const ReportList = ({ data }) => {
  return (
    <>
      {!data ||
        (data?.length === 0 && (
          <h1 className="w-[calc(100vw-100px text-center)]">
            No records found. Please add a new report.
          </h1>
        ))}
      {data &&
        data?.length > 0 &&
        data?.map((report) => (
          <CategorizedListItemLink
            to={getRouteWithParams(ROUTES.companies.reports.report.index, {
              companyId: report?.companyId,
              reportId: report?.id
            })}
            key={`report_list_item_${report?.id}`}
          >
            <CategorizedListItemDate>{handleDateFormat(report?.createdAt)}</CategorizedListItemDate>
            <CategorizedListItemTitle>{report?.title}</CategorizedListItemTitle>
            <CategorizedListItemCategoryContainer>
              Jurisdiction:
              <CategorizedListItemCategory>{report?.jurisdiction}</CategorizedListItemCategory>
            </CategorizedListItemCategoryContainer>
          </CategorizedListItemLink>
        ))}
    </>
  )
}
