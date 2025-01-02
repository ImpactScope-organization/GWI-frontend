import { Link, useLocation } from 'react-router-dom'
import React, { useCallback } from 'react'

export const PageTab = ({ to, children }) => {
  const { pathname } = useLocation()

  const isRouteActive = useCallback(
    (route) => {
      return route === pathname
    },
    [pathname]
  )
  return (
    <Link
      to={to}
      className={`cursor-pointer ${
        isRouteActive(to)
          ? 'border-b-[2px] border-primary text-darkBlack font-semibold'
          : 'text-[#5f6264]'
      }  pb-1 `}
    >
      {children}
    </Link>
  )
}
