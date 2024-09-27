import React, { createContext, useCallback, useContext, useState } from 'react'
import axios from 'axios'
import apiUrl from '../utils/baseURL'

const initialCompany = {
  currentCompanyData: '',
  claims: '',
  index: ''
}

const CompanyContext = createContext({
  currentCompany: initialCompany,
  getCurrentCompany: () => {}
})

// Create a provider component
export function CompanyContextProvider({ children }) {
  const [currentCompany, setCurrentCompany] = useState(initialCompany)

  const getCurrentCompany = useCallback(async (companyID) => {
    const response = await axios.get(`${apiUrl}/api/company/${companyID}`)
    const { data } = response
    setCurrentCompany(data?.result)
  }, [])

  return (
    <CompanyContext.Provider
      value={{
        getCurrentCompany,
        currentCompany
      }}
    >
      {children}
    </CompanyContext.Provider>
  )
}

// Custom hook to access the context
export function useCompanyContext() {
  return useContext(CompanyContext)
}
