import { CategorySelectGroupTitle } from '../../../../Prompts/components/CategorySelect/components/CategorySelectGroupTitle'
import { Select } from 'antd'
import React from 'react'
import { useFormikContext } from 'formik'
import { useGetCompanyTwitterYears } from '../../../api/CompanyApiQuery'

export const ReportTwitterYearSelectInput = ({ name }) => {
  const formik = useFormikContext()
  const { companyTwitterYears } = useGetCompanyTwitterYears()

  return (
    <div>
      <CategorySelectGroupTitle>Select Twitter Years</CategorySelectGroupTitle>
      <div className="w-full flex gap-4">
        <Select
          className="w-full"
          mode="multiple"
          onChange={(value) => {
            formik.setFieldValue(name, value)
          }}
          value={formik.values[name] || []}
        >
          {companyTwitterYears &&
            companyTwitterYears.map((item) => (
              <Select.Option key={`report_twitter_year_${item}`} value={item}>
                {item}
              </Select.Option>
            ))}
        </Select>
      </div>
    </div>
  )
}
