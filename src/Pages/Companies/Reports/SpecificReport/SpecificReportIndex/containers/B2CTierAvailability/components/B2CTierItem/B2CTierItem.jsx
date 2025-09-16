import React from 'react'
import { useCurrentCompanyReport } from '../../../../../hooks/useCurrentCompanyReport'
import { useB2CTierItem } from './useB2CTierItem'
import { ToggleWithLabel } from '../../../../../../../../../Components/ToggleWithLabel/ToggleWithLabel'

export const B2CTierItem = ({ b2cTier }) => {
  const { currentCompanyReportIsLoading } = useCurrentCompanyReport()
  const { handleB2CTierChange } = useB2CTierItem({ b2cTier })

  return (
    <ToggleWithLabel
      label={b2cTier.name}
      checked={b2cTier.isSelected}
      onChange={handleB2CTierChange}
      disabled={currentCompanyReportIsLoading}
    />
  )
}
