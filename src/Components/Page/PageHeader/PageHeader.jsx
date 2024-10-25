import { ButtonLink } from '../../ButtonLink/ButtonLink'
import { ROUTES } from '../../../routes'
import React from 'react'

export const PageHeader = ({ title, subTitle, children }) => (
  <div className="flex justify-between items-start mb-6">
    {/* Left */}
    <div>
      <h1 className="text-darkBlack font-bold text-3xl mb-1">{title}</h1>
      <p className="subtitle-text ">{subTitle}</p>
    </div>
    {/* Right */}
    {children}
  </div>
)
