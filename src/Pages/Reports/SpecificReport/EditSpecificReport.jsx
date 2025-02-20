import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import apiUrl from '../../../utils/baseURL'
import { formattedDate } from '../../../utils/date'
import LoadingPage from '../../../Components/loading'
import CustomGaugeChart from '../../../Components/gauge-chart'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { Dropdown } from 'antd'
import { captureScreen, toTitleCase } from '../../../utils/helpers'
import Switch from 'react-switch'
import { Input } from 'antd'
import { CustomReactQuill } from '../../../Components/CustomReactQuill/CustomReactQuill'
import { useNavigate, useParams } from 'react-router-dom'
import { BackButtonLink } from '../../../Components/BackButtonLink/BackButtonLink'
import { ROUTES } from '../../../routes'
import { useGetCompanyReport } from '../../../Hooks/reports-hooks'
import { PageContainer } from '../../../Components/Page/PageContainer/PageContainer'
import html2canvas from 'html2canvas'
import { EditReportContentItem } from '../../../Components/EditReportContentItem/EditReportContentItem'

export const EditSpecificReport = () => {
  const navigate = useNavigate()

  const { id: reportId } = useParams()

  const {
    refetch: getCurrentCompanyReport,
    data: currentCompanyReport,
    isLoading: currentCompanyReportIsLoading
  } = useGetCompanyReport(reportId)

  const [isModifying, setIsModifying] = useState(false)
  const [modifyData, setModifyData] = useState(null)

  const [isDemo, setIsDemo] = useState(false)
  const [isRegulator, setIsRegulator] = useState(false)

  // description states
  const [contradictions, setContradictions] = useState('')
  const [potentialInconsistencies, setPotentialInconsistencies] = useState('')
  const [unsubstantiatedClaims, setunsubstantiatedClaims] = useState('')
  // sources states
  const [sources, setsources] = useState([])

  useEffect(() => {
    if (currentCompanyReport?.isDemo) {
      setIsDemo(!!currentCompanyReport?.isDemo)
    }

    if (currentCompanyReport?.sentToRegulators) {
      setIsRegulator(currentCompanyReport?.sentToRegulators === 'true')
    }

    if (currentCompanyReport?.contradiction) {
      setContradictions(currentCompanyReport?.contradiction)
    }

    if (currentCompanyReport?.potentialInconsistencies) {
      setPotentialInconsistencies(currentCompanyReport?.potentialInconsistencies)
    }

    if (currentCompanyReport?.unsubstantiatedClaims) {
      setunsubstantiatedClaims(currentCompanyReport?.unsubstantiatedClaims)
    }

    if (currentCompanyReport?.sources) {
      setsources(JSON.parse(currentCompanyReport?.sources))
    }
  }, [currentCompanyReport])

  const greenwashingRiskPercentage = currentCompanyReport?.greenwashRiskPercentage
  const reportingRiskPercentage = currentCompanyReport?.reportingRiskPercentage

  // Print Report
  const [isSendToBlockchainInProgress, setIsSendToBlockchainInProgress] = useState(false)

  const blockchainTransactionURL = currentCompanyReport?.blockchainTransactionURL
  const blockchainFileURL = currentCompanyReport?.blockchainFileURL

  const handleSendToBlockchain = useCallback(async () => {
    setIsSendToBlockchainInProgress(true)
    try {
      const element = document.querySelector('#report-container')

      const canvas = await html2canvas(element)
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'))

      const file = new File([blob], 'fileName.jpg', { type: 'image/jpeg' })
      const formData = new FormData()
      formData.append('file', file)

      await axios.post(`${apiUrl}/api/blockchain/create/${reportId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: '*/*',
          'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8'
        }
      })
      await getCurrentCompanyReport()
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message)
      } else {
        toast(error.message)
      }
    } finally {
      setIsSendToBlockchainInProgress(false)
    }
  }, [getCurrentCompanyReport, reportId])

  const deleteCompanyHandler = async () => {
    const response = await axios.delete(`${apiUrl}/api/company/delete/${currentCompanyReport?.id}`)
    const { data } = response
    if (data?.status === 'success') {
      toast.success(data?.message)
      navigate(ROUTES.reports.internal)
    } else {
      toast.error('something went wrong while deleting the report')
    }
  }
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
            {!isModifying && (
              <div className="mt-[16px] grid grid-cols-5 max-w-[60%]">
                <p className="text-reportGrey  col-span-2 text-[1em] text-base mb-1 font-medium">
                  Jurisdiction
                </p>
                <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                  {currentCompanyReport?.jurisdiction}
                </p>
                <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
                  Sector
                </p>
                <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                  {currentCompanyReport?.sector}
                </p>
                <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
                  Annual Revenue
                </p>
                <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                  {currentCompanyReport?.annualRevenue}
                </p>
                <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
                  Employees
                </p>
                <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                  {currentCompanyReport?.noOfEmployees?.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Contradiction */}
          <EditReportContentItem
            title="Contradictions"
            isModifying={isModifying}
            onChange={(value) => handleInputUpdates('contradiction', value)}
            modifyData={modifyData?.contradiction}
            displayValue={contradictions}
          />
          {/*    Potential inconsistencies */}
          <EditReportContentItem
            title="Potential inconsistencies"
            isModifying={isModifying}
            onChange={(value) => handleInputUpdates('potentialInconsistencies', value)}
            modifyData={modifyData?.potentialInconsistencies}
            displayValue={potentialInconsistencies}
          />

          {/* Unsubstantiated claims */}
          <EditReportContentItem
            title="Unsubstantiated claims"
            isModifying={isModifying}
            onChange={(value) => handleInputUpdates('unsubstantiatedClaims', value)}
            modifyData={modifyData?.unsubstantiatedClaims}
            displayValue={unsubstantiatedClaims}
          />

          {/* sources */}
          {!isModifying && (
            <div className="mt-[32px]">
              <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">Sources</h2>
              <div className="grid grid-cols-1 gap-6">
                {sources?.length > 0 ? (
                  sources?.map((source, index) => {
                    return (source?.title || source?.Title) &&
                      (source?.description || source?.Description) ? (
                      <div
                        className="group bg-[#F3F5F7] p-3 rounded-md"
                        key={`${index}-read-source`}
                      >
                        <p className="text-reportGrey text-[1em] text-base font-medium">
                          {source?.title || source?.Title}
                        </p>
                        <div
                          className="text-darkBlack mt-[8px] text-[1em] text-base font-medium green-links"
                          dangerouslySetInnerHTML={{
                            __html: source?.description || source?.Description
                          }}
                        />
                      </div>
                    ) : (
                      <React.Fragment key={`${index}-empty`} />
                    )
                  })
                ) : (
                  <p className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium">
                    No data found
                  </p>
                )}
              </div>
            </div>
          )}

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
                    setIsModifying(false)
                  }}
                  className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
                >
                  Update report
                </button>
                <button
                  className="bg-transparent border border-darkBlack rounded-lg py-[12px] px-[4px] flex w-full justify-center text-darkBlack text-[16px] font-[600] leading-[24px]"
                  onClick={() => {
                    setModifyData(null)
                    setIsModifying(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {!isModifying && (
            <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
              <h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
              <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
                <CustomGaugeChart
                  percentage={
                    greenwashingRiskPercentage && greenwashingRiskPercentage <= 100
                      ? parseInt(greenwashingRiskPercentage)
                      : greenwashingRiskPercentage > 100
                        ? 99
                        : 0
                  }
                />
              </div>
              {/* Cols */}
              <div className="mt-[24px] grid grid-cols-2 lg:max-w-[370px]  gap-2 my-3 ">
                <p className="text-reportGrey   text-[1em] text-base mb-1 font-medium">
                  Reporting risk
                </p>
                <div className="flex flex-row  items-center gap-[4px] flex-nowrap">
                  {Array.from({ length: 10 }).map((_item, index) => {
                    return (
                      <div
                        key={`${index}-bar`}
                        className={`w-[4px] h-[14px] rounded-sm ${
                          (index + 1) * 10 <= parseInt(reportingRiskPercentage)
                            ? 'bg-darkGreen'
                            : 'bg-reportGrey '
                        }`}
                      ></div>
                    )
                  })}
                  <p className="text-darkBlack ml-[8px] text-[1em] text-base font-medium">
                    {parseInt(reportingRiskPercentage)}%
                  </p>
                </div>
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                  GHG emissions
                </p>
                <p className="text-darkBlack  text-[1em] text-base mb-1 font-medium">
                  {currentCompanyReport?.GHGEmissions}
                </p>
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                  Report status
                </p>
                <p className={`text-darkBlack justify-left  text-[1em] md:ml-0 text-base mb-1 `}>
                  <span
                    className={` text-white text-center py-1 px-3   rounded-3xl font-medium ${
                      currentCompanyReport?.pending === 'true' &&
                      currentCompanyReport?.disregard === 'false'
                        ? 'bg-foggyGrey'
                        : currentCompanyReport?.reviewing === 'true'
                          ? 'bg-review'
                          : currentCompanyReport?.reviewed === 'true'
                            ? 'bg-darkGreen'
                            : currentCompanyReport?.disregard === 'true'
                              ? 'bg-danger'
                              : 'bg-foggyGrey'
                    }`}
                  >
                    {currentCompanyReport?.pending === 'true' &&
                    currentCompanyReport?.disregard === 'false'
                      ? 'Pending Review'
                      : currentCompanyReport?.reviewing === 'true'
                        ? 'In Review'
                        : currentCompanyReport?.reviewed === 'true'
                          ? 'Reviewed'
                          : currentCompanyReport?.disregard === 'true'
                            ? 'Disregard'
                            : toTitleCase(currentCompanyReport?.status) || 'Generated'}
                  </span>
                </p>
                {blockchainTransactionURL && (
                  <>
                    <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                      Timestamp
                    </p>
                    <a className="col-span-1 text-[1em] text-base mb-1 font-medium">
                      {formattedDate}
                    </a>
                    <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                      Solana Transaction
                    </p>
                    <a
                      href={`${blockchainTransactionURL}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-darkGreen col-span-1 truncate text-[1em]  mb-1 font-medium"
                    >
                      {blockchainTransactionURL}
                    </a>
                  </>
                )}
                {blockchainFileURL && (
                  <>
                    <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                      View report on chain
                    </p>
                    <a
                      href={blockchainFileURL}
                      target="_blank"
                      rel="noreferrer"
                      className="text-darkGreen truncate text-[1em] text-base mb-1 font-medium"
                    >
                      {blockchainFileURL}
                    </a>
                  </>
                )}
              </div>
              {/* todo make this as a component */}
              {(!blockchainTransactionURL || !blockchainFileURL) && (
                <div className="flex flex-row gap-4 w-full">
                  <button
                    disabled={isSendToBlockchainInProgress}
                    onClick={handleSendToBlockchain}
                    className={`${
                      isSendToBlockchainInProgress ? 'bg-greyText' : 'bg-darkGreen'
                    } flex-1 rounded-lg py-3 px-3 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]`}
                  >
                    Send to blockchain
                  </button>
                  <Dropdown
                    disabled={isSendToBlockchainInProgress}
                    trigger={['click']}
                    menu={{
                      onClick: (e) => {
                        if (e.key == 1) {
                          captureScreen('report-container', currentCompanyReport?.companyName)
                        } else if (e.key == 2) {
                          if (
                            window.confirm(
                              `Are you sure you want to delete this Report? \n${currentCompanyReport?.companyName}`
                            )
                          ) {
                            deleteCompanyHandler()
                          }
                        } else {
                          const data = {
                            contradiction: currentCompanyReport?.contradiction,
                            potentialInconsistencies:
                              currentCompanyReport?.potentialInconsistencies,
                            unsubstantiatedClaims: currentCompanyReport?.unsubstantiatedClaims,
                            greenwashRiskPercentage: parseInt(
                              currentCompanyReport?.greenwashRiskPercentage
                            ),
                            reportingRiskPercentage: parseInt(
                              currentCompanyReport?.reportingRiskPercentage
                            ),
                            jurisdiction: currentCompanyReport?.jurisdiction,
                            sector: currentCompanyReport?.sector,
                            annualRevenue: currentCompanyReport?.annualRevenue,
                            noOfEmployees: currentCompanyReport?.noOfEmployees,
                            GHGEmissions: currentCompanyReport?.GHGEmissions,
                            sources: sources
                          }
                          setModifyData(data)
                          setIsModifying(true)
                        }
                      },
                      items: [
                        { label: 'Modify Report', key: '0' },
                        {
                          label: 'Save as PDF',
                          key: '1'
                        },
                        { label: 'Remove from DB', key: '2' }
                      ]
                    }}
                    placement="bottomRight"
                  >
                    <div className="py-[12px] px-[18px] rounded-md border bg-transparent flex justify-center items-center">
                      <IoEllipsisHorizontalSharp />
                    </div>
                  </Dropdown>
                </div>
              )}
              {blockchainTransactionURL && blockchainFileURL && (
                <div className="flex flex-row justify-center gap-2 col-span-2 w-full">
                  <button
                    onClick={() =>
                      captureScreen('report-container', currentCompanyReport?.companyName)
                    }
                    className="bg-primary rounded-lg py-[12px] flex w-full text-center justify-center px-[4px] col-span-1 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]"
                  >
                    Download as .pdf
                  </button>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete this Report? \n${currentCompanyReport?.companyName}`
                        )
                      ) {
                        deleteCompanyHandler()
                      }
                    }}
                    className="bg-white border border-darkBlack rounded-lg w-full text-center justify-center flex py-[12px] col-span-1 px-[4px] text-darkBlack text-[16px] font-[600] leading-[24px]"
                  >
                    Remove from DB
                  </button>
                </div>
              )}
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
          {!isModifying && (
            <div className="card_shadow mt-8  rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
              <h2 className="text-[18px] leading-[24px] font-[600]">Visibility</h2>
              <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
                <div className="flex flex-row gap-2 w-full justify-between">
                  <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
                    <span className="truncate">Demo</span>
                  </h2>
                  <div>
                    <Switch
                      height={24}
                      onChange={async (val) => {
                        setIsDemo(val)
                        try {
                          const response = await axios.put(
                            `${apiUrl}/api/company/update/${currentCompanyReport?.id}`,
                            {
                              isDemo: val
                            }
                          )
                          const { data } = response
                          if (data) {
                            toast.success(
                              `Report is ${val === false ? 'removed from' : 'sent to'} demo`
                            )
                          }
                        } catch (error) {
                          toast.error('Something went wrong.')
                        }
                      }}
                      checked={isDemo}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#4DC601"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
                <div className="flex flex-row gap-2 w-full justify-between">
                  <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
                    <span className="truncate">Regulator</span>
                  </h2>
                  <div>
                    <Switch
                      height={24}
                      onChange={async (val) => {
                        setIsRegulator(val)
                        try {
                          const response = await axios.put(
                            `${apiUrl}/api/company/update/${currentCompanyReport?.id}`,
                            {
                              sentToRegulators: val,
                              sendToRegulatorsTimeStamp: formattedDate,
                              pending:
                                (currentCompanyReport?.reviewing === 'false' ||
                                  !currentCompanyReport?.reviewing) &&
                                (currentCompanyReport?.reviewed === 'false' ||
                                  !currentCompanyReport?.reviewed) &&
                                (currentCompanyReport?.disregard === 'false' ||
                                  !currentCompanyReport?.disregard)
                                  ? 'true'
                                  : 'false'
                            }
                          )
                          const { data } = response
                          if (data) {
                            toast.success(
                              `Report is ${val === false ? 'removed from' : 'sent to'} regulator`
                            )
                          }
                        } catch (error) {
                          toast.error('Something went wrong.')
                        }
                      }}
                      checked={isRegulator}
                      checkedIcon={false}
                      uncheckedIcon={false}
                      onColor="#4DC601"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
                <div className="flex flex-row gap-2 w-full justify-between">
                  <h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
                    <span className="truncate">Specific Client</span>
                  </h2>
                  <p className="text-darkBlack ml-4 text-[1em] text-base mb-1 font-medium">
                    <span className="py-1 px-3 rounded-3xl bg-foggyGrey">coming soon</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  )
}
