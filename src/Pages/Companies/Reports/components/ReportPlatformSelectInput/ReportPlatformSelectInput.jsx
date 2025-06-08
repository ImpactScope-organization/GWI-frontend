import { CategorySelectGroupTitle } from '../../../../Prompts/components/CategorySelect/components/CategorySelectGroupTitle'
import { Select } from 'antd'
import React from 'react'
import { useGetReportPlatforms } from '../../api/ReportApiQuery'
import { useFormikContext } from 'formik'

export const ReportPlatformSelectInput = ({ name }) => {
  const formik = useFormikContext()
  const { reportPlatforms } = useGetReportPlatforms()

  return (
    <div>
      <CategorySelectGroupTitle>Select Platforms</CategorySelectGroupTitle>
      <div className="w-full flex gap-4">
        <Select
          className="w-full"
          mode="multiple"
          onChange={(value) => {
            console.log('value changed:', value)
            formik.setFieldValue(name, value)
          }}
          value={formik.values[name] || []}
        >
          {reportPlatforms &&
            reportPlatforms.map(({ slug, name }) => (
              <Select.Option key={`report_platform_${slug}`} value={slug}>
                {name}
              </Select.Option>
            ))}
        </Select>
      </div>
    </div>
  )
}
