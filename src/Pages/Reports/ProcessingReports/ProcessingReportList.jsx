import React from 'react'
import { CategorizedListItemLink } from '../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemLink'
import { CategorizedListItemDate } from '../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemDate'
import { CategorizedListItemTitle } from '../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemTitle'
import { CategorizedListItemCategoryContainer } from '../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategoryContainer'
import { CategorizedListItemCategory } from '../../../Components/CategorizedList/CategorizedListItemLink/CategorizedListItemCategory'
import { handleDateFormat } from '../../../utils/date'
import { getRouteWithId, ROUTES } from '../../../routes'
export const ProcessingReportList = ({ data }) => {
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
          <CategorizedListItemLink
            to={getRouteWithId(ROUTES.reports.processingDetails, report?.id)}
            key={`report_queue_list_item_${report?.id}`}
          >
            <CategorizedListItemDate>{handleDateFormat(report?.createdAt)}</CategorizedListItemDate>
            <CategorizedListItemTitle>{report?.companyName}</CategorizedListItemTitle>
            <CategorizedListItemCategoryContainer>
              Status:
              <CategorizedListItemCategory>{report?.status}</CategorizedListItemCategory>
            </CategorizedListItemCategoryContainer>
          </CategorizedListItemLink>
        ))}
    </>
  )
}
