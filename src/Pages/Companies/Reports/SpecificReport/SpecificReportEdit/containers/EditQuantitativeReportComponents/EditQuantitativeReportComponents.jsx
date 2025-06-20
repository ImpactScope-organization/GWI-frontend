import React from 'react'
import { SpecificReportInputPercentage } from '../../components/SpecificReportInputText/SpecificReportInputPercentage'

export const EditQuantitativeReportComponents = ({
  quantitativePercentageCategory,
  quantitativePercentageCategoryIndex
}) => {
  return (
    <div className="card_shadow rounded-2xl py-4 px-3 flex flex-col gap-4">
      <h3 className="text-[18px] leading-[24px] font-[600]">
        {quantitativePercentageCategory.name}
      </h3>

      {quantitativePercentageCategory.components.map((component, componentIndex) => (
        <SpecificReportInputPercentage
          key={component.id}
          name={`quantitativePercentages[${quantitativePercentageCategoryIndex}].components[${componentIndex}].value`}
          label={component.name}
        />
      ))}
    </div>
  )
}
