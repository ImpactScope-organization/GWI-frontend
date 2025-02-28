import React from 'react'

export const ReportingRiskItem = ({ title, children }) => (
  <div className="grid grid-cols-2">
    <h3 className="text-reportGrey  text-[1em] text-base mb-1 font-medium">{title}</h3>
    <div className="text-darkBlack  text-[1em] text-base mb-1 font-medium">{children}</div>
  </div>
)
