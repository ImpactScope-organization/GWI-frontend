import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import apiUrl from '../../../utils/baseURL'
import { formattedDate } from '../../../utils/date'
import LoadingPage from '../../../Components/loading'
import { Input } from 'antd'
import { CustomReactQuill } from '../../../Components/CustomReactQuill/CustomReactQuill'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import { useGetCompanyReport } from '../../../Hooks/reports-hooks'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import { EditReportContentItem } from '../../../Components/EditReportContentItem/EditReportContentItem'
import { getUrlWithParameters } from '../../../utils/route'

export const EditSpecificReport = () => {
  const navigate = useNavigate()

  const { id: reportId } = useParams()

  const {
    refetch: getCurrentCompanyReport,
    data: currentCompanyReport,
    isLoading: currentCompanyReportIsLoading
  } = useGetCompanyReport(reportId)

  const isModifying = true
  const [modifyData, setModifyData] = useState({})

  useEffect(() => {
    setModifyData({
      ...currentCompanyReport,
      sources: currentCompanyReport?.sources ? JSON.parse(currentCompanyReport?.sources) : []
    })
  }, [currentCompanyReport])

  const handleInputUpdates = (name, value) => {
    setModifyData((prev) => ({ ...prev, [name]: value }))
  }

  if (currentCompanyReportIsLoading) {
    return <LoadingPage title="Please wait..." />
  }

  return (
    <PageContainer>
      <BackButtonLink to={ROUTES.reports.internal} />

      {/* Specific Report */}
      <div id="report-container" className="flex flex-col md:flex-row gap-6 max-w-[1120px] mx-auto">
        <div
          style={{
            boxShadow:
              '0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)'
          }}
          className="basis-8/12 max-w-[740px] p-[16px]  mx-auto rounded-2xl "
        >
          {/* Top */}

          <div>
            <p className="leading-[24px] text-sm text-reportGrey font-medium">{formattedDate}</p>
            <h1 className="leading-[64px] text-darkBlack text-2xl font-bold">
              {currentCompanyReport?.companyName}
            </h1>
            {isModifying && (
              <div className="flex flex-col gap-[16px] mt-[24px]">
                <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                  <p className="text-reportGrey text-[1em] text-base font-medium">Jurisdiction</p>
                  <Input
                    variant="borderless"
                    value={modifyData?.jurisdiction}
                    onChange={(e) => handleInputUpdates('jurisdiction', e.target.value)}
                    className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                  />
                </div>
                <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                  <p className="text-reportGrey text-[1em] text-base font-medium">Sector</p>
                  <Input
                    variant="borderless"
                    value={modifyData?.sector}
                    onChange={(e) => handleInputUpdates('sector', e.target.value)}
                    className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                  />
                </div>
                <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                  <p className="text-reportGrey text-[1em] text-base font-medium">Annual Revenue</p>
                  <Input
                    variant="borderless"
                    value={modifyData?.annualRevenue}
                    onChange={(e) => handleInputUpdates('annualRevenue', e.target.value)}
                    className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                  />
                </div>
                <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                  <p className="text-reportGrey text-[1em] text-base font-medium">Employees</p>
                  <Input
                    variant="borderless"
                    value={modifyData?.noOfEmployees}
                    onChange={(e) => handleInputUpdates('noOfEmployees', e.target.value)}
                    className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Contradiction */}
          <EditReportContentItem
            title="Contradictions"
            onChange={(value) => handleInputUpdates('contradiction', value)}
            modifyData={modifyData?.contradiction}
          />
          {/*    Potential inconsistencies */}
          <EditReportContentItem
            title="Potential inconsistencies"
            onChange={(value) => handleInputUpdates('potentialInconsistencies', value)}
            modifyData={modifyData?.potentialInconsistencies}
          />

          {/* Unsubstantiated claims */}
          <EditReportContentItem
            title="Unsubstantiated claims"
            onChange={(value) => handleInputUpdates('unsubstantiatedClaims', value)}
            modifyData={modifyData?.unsubstantiatedClaims}
          />

          {/* Modify sources */}
          {isModifying && (
            <div className="grid grid-cols-1 gap-6">
              {modifyData?.sources?.map((source, index) => {
                return (
                  <div className="mt-[32px]" key={`${index}-edit-source`}>
                    <div className="flex justify-between">
                      <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">Source</h2>
                      <button
                        className="hover:opacity-25"
                        data-testid="SpecificReport.DeleteButton"
                        onClick={() => {
                          if (
                            window.confirm(
                              `Are you sure you want to delete this Source? \n${source?.title || source?.Title}`
                            )
                          ) {
                            const upcomingSources = modifyData?.sources?.filter(
                              (_, indexToFilter) => indexToFilter !== index
                            )
                            setModifyData((prev) => ({
                              ...prev,
                              sources: upcomingSources
                            }))
                          }
                        }}
                      >
                        ❌
                      </button>
                    </div>
                    <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                      <p className="text-reportGrey text-[1em] text-base font-medium">Heading</p>
                      <Input
                        type="text"
                        variant="borderless"
                        value={source?.title || source?.Title}
                        onChange={(e) => {
                          setModifyData((prev) => ({
                            ...prev,
                            sources: prev?.sources?.map((cSource, cIndex) => {
                              if (cIndex === index) {
                                if (cSource.hasOwnProperty('title')) {
                                  return {
                                    ...cSource,
                                    title: e.target.value
                                  }
                                } else {
                                  return {
                                    ...cSource,
                                    Title: e.target.value
                                  }
                                }
                              }
                              return cSource
                            })
                          }))
                        }}
                        className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                      />
                    </div>
                    <div className="focus-within:border-primary rounded-lg mt-[16px] p-[16px] border border-1 focus-withing:border-primary">
                      <p className="text-reportGrey text-[1em] text-base font-medium mb-2">Text</p>
                      <CustomReactQuill
                        value={source?.description || source?.Description}
                        onChange={(upcomingValue) => {
                          setModifyData((prev) => ({
                            ...prev,
                            sources: prev?.sources?.map((cSource, cIndex) => {
                              if (cIndex === index) {
                                if (cSource.hasOwnProperty('Description')) {
                                  return {
                                    ...cSource,
                                    Description: upcomingValue
                                  }
                                } else {
                                  return {
                                    ...cSource,
                                    description: upcomingValue
                                  }
                                }
                              }
                              return cSource
                            })
                          }))
                        }}
                      />
                    </div>
                  </div>
                )
              })}
              <div>
                <button
                  className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
                  onClick={() => {
                    const upcomingSources = [
                      ...modifyData?.sources,
                      {
                        Title: '',
                        Description: ''
                      }
                    ]
                    setModifyData((prev) => ({
                      ...prev,
                      sources: upcomingSources
                    }))
                  }}
                >
                  Add Source
                </button>
              </div>
            </div>
          )}
        </div>
        <div>
          {isModifying && (
            <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
              <h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
              <div className="flex flex-col gap-[16px] my-[24px]">
                <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                  <p className="text-reportGrey text-[1em] text-base font-medium">
                    Greenwashing risk
                  </p>
                  <div className="flex items-center gap-1 mt-[8px]">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      // variant="borderless"
                      value={modifyData?.greenwashRiskPercentage}
                      onChange={(e) => {
                        e.preventDefault()
                        if (e.target.value <= 100 && e.target.value >= 0) {
                          handleInputUpdates('greenwashRiskPercentage', e.target.value)
                        }
                      }}
                      // suffix={<p className="text-reportGrey">%</p>}
                      className="w-full border-none p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden focus:border-none focus:outline-none"
                    />
                    <p className="text-reportGrey">%</p>
                  </div>
                </div>
                <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                  <p className="text-reportGrey text-[1em] text-base font-medium">Reporting risk</p>
                  <div className="flex items-center gap-1 mt-[8px]">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={modifyData?.reportingRiskPercentage}
                      onChange={(e) => {
                        e.preventDefault()
                        if (e.target.value <= 100 && e.target.value >= 0) {
                          handleInputUpdates('reportingRiskPercentage', e.target.value)
                        }
                      }}
                      className="w-full border-none p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden focus:border-none focus:outline-none"
                    />
                    <p className="text-reportGrey">%</p>
                  </div>
                </div>
                <div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
                  <p className="text-reportGrey text-[1em] text-base font-medium">GHG emissions</p>
                  <Input
                    type="text"
                    variant="borderless"
                    value={modifyData?.GHGEmissions}
                    onChange={(e) => {
                      handleInputUpdates('GHGEmissions', e.target.value)
                    }}
                    className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 ">
                <button
                  onClick={async () => {
                    if (modifyData?.contradiction === '') {
                      return toast.warn('Contradictions field cannot be empty.')
                    } else if (modifyData?.potentialInconsistencies === '') {
                      return toast.warn('Potential Inconsistencies field cannot be empty.')
                    } else if (modifyData?.unsubstantiatedClaims === '') {
                      return toast.warn('Unsubstantiated Claims field cannot be empty.')
                    } else if (
                      !modifyData?.greenwashRiskPercentage ||
                      isNaN(modifyData?.greenwashRiskPercentage)
                    ) {
                      return toast.warn('Greenwash Risk  field cannot be empty.')
                    } else if (
                      !modifyData?.reportingRiskPercentage ||
                      isNaN(modifyData?.reportingRiskPercentage)
                    ) {
                      return toast.warn('Reporting Risk field cannot be empty.')
                    } else if (modifyData?.jurisdiction === '') {
                      return toast.warn('Jurisdiction field cannot be empty.')
                    } else if (modifyData?.sector === '') {
                      return toast.warn('Sector field cannot be empty.')
                    } else if (modifyData?.annualRevenue === '') {
                      return toast.warn('Annual Revenue field cannot be empty.')
                    } else if (modifyData?.noOfEmployees === '') {
                      return toast.warn('no.of employees field cannot be empty.')
                    } else if (modifyData?.GHGEmissions === '') {
                      return toast.warn('GHG Emissions field cannot be empty.')
                    }
                    try {
                      const response = await axios.put(
                        `${apiUrl}/api/company/update/${currentCompanyReport?.id}`,
                        {
                          ...modifyData,
                          sources: JSON.stringify(modifyData?.sources)
                        }
                      )
                      const { data } = response
                      if (data) {
                        toast.success('Successfully updated the report.')
                      }
                      await getCurrentCompanyReport()

                      setModifyData(null)
                    } catch (error) {
                      toast.error('Something went wrong while updating the report.')
                      setModifyData(null)
                    }
                    navigate(getUrlWithParameters(ROUTES.specificReport.index, { id: reportId }))
                  }}
                  className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
                >
                  Update report
                </button>
                <button
                  className="bg-transparent border border-darkBlack rounded-lg py-[12px] px-[4px] flex w-full justify-center text-darkBlack text-[16px] font-[600] leading-[24px]"
                  onClick={() => {
                    navigate(getUrlWithParameters(ROUTES.specificReport.index, { id: reportId }))
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <div className="card_shadow mt-8 gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
            <h2 className="text-[18px] leading-[24px] font-[600]">Documents</h2>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
              <img src="/assets/xls-icon.svg" alt="xls-icon" />
              <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
                <span className="truncate">{currentCompanyReport?.fileName}</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
