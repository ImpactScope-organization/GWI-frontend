import React from 'react'

export const PageHeader = ({ title, subTitle, children }) => (
  <div className="flex justify-between items-center mb-6">
    {/* Left */}
    <div>
      <h1 className="text-darkBlack font-bold text-3xl mb-1">{title}</h1>
      <p className="subtitle-text ">{subTitle}</p>
    </div>
    {/* Right */}
    <div className="self-center">{children}</div>
  </div>
)
