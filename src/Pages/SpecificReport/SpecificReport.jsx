import React from 'react'
import { toast } from 'react-toastify'
import { formattedDate } from '../../utils/date'
import LoadingPage from '../../Components/Loading/Loading'
import CustomGaugeChart from '../../Components/GaugeChart/GaugeChart'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import { Dropdown } from 'antd'
import { captureScreen, toTitleCase } from '../../utils/helpers'
import Switch from 'react-switch'
import { BackButtonLink } from '../../Components/BackButtonLink/BackButtonLink'
import { getRouteWithId, ROUTES } from '../../routes'
import { useSpecificReport } from './useSpecificReport'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../utils/axios'

// ----------------------------
export const SpecificReport = () => {
  const {
    isLoading,
    currentCompany,
    contradictions,
    potentialInconsistencies,
    unsubstantiatedClaims,
    sources,
    greenwashRiskPercentage,
    reportingRiskPercentage,
    hash,
    etherscanURL,
    isSendingToRegulator,
    handleSendToRegulators,
    deleteCompanyHandler,
    setIsDemo,
    isDemo,
    setIsRegulator,
    isRegulator
  } = useSpecificReport()

  const navigate = useNavigate()

  if (isLoading) {
    return (
      <LoadingPage title="Please wait..." description="Please wait, report is being generated." />
    )
  }
  return (
    <div>
      <BackButtonLink to={ROUTES.reports} />

      {/* Specific Report */}
      <div
        id="report-container"
        className="flex flex-col md:flex-row gap-6 my-10 px-16 lg:px-6 max-w-[1120px] mx-auto"
      >
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
              {currentCompany?.companyName}
            </h1>

            <div className="mt-[16px] grid grid-cols-5 max-w-[60%]">
              <p className="text-reportGrey  col-span-2 text-[1em] text-base mb-1 font-medium">
                Jurisdiction
              </p>
              <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                {currentCompany?.jurisdiction}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
                Sector
              </p>
              <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                {currentCompany?.sector}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
                Annual Revenue
              </p>
              <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                {currentCompany?.annualRevenue}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
                Employees
              </p>
              <p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
                {currentCompany?.noOfEmployees?.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Contradiction */}
          <div
            className={`group focus-within:border-primary bg-[#F3F5F7] p-3 rounded-lg mt-[32px] mb-[16px]`}
          >
            <p className="text-reportGrey text-[1em] text-base font-medium">Contradictions</p>

            <p
              className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium"
              key={'contradiction'}
            >
              {contradictions &&
                contradictions
                  ?.split('\n')
                  ?.filter((item) => item !== '\n')
                  ?.map((text, index) => (
                    <React.Fragment key={`${index}-contradiction`}>
                      <span dangerouslySetInnerHTML={{ __html: text }} />
                      <br />
                    </React.Fragment>
                  ))}
            </p>
          </div>
          {/*    Potential inconsistencies */}
          <div
            className={`group pointer-events-auto focus-within:border-primary bg-[#F3F5F7] p-3 rounded-lg mt-[32px] mb-[16px]`}
          >
            <p className="text-reportGrey text-[1em] text-base font-medium">
              Potential inconsistencies
            </p>
            <p className="text-text-darkBlack mt-[8px] text-[1em] text-base font-medium ">
              {potentialInconsistencies > '' &&
                potentialInconsistencies
                  ?.split('\n')
                  ?.filter((item) => item !== '\n')
                  ?.map((text, index) => (
                    <React.Fragment key={`${index}-pi`}>
                      {text}
                      <br />
                    </React.Fragment>
                  ))}
            </p>
          </div>
          {/* Unsubstantiated claims */}
          <div
            className={`group focus-within:border-primary bg-[#F3F5F7] p-3 rounded-lg mt-[32px] mb-[16px]`}
          >
            <p className="text-reportGrey text-[1em] text-base font-medium">
              Unsubstantiated claims
            </p>
            <p className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium ">
              {unsubstantiatedClaims &&
                unsubstantiatedClaims
                  ?.split('\n')
                  ?.filter((item) => item !== '\n')
                  ?.map((text, index) => (
                    <React.Fragment key={`${index}-uc`}>
                      {text}
                      <br />
                    </React.Fragment>
                  ))}
            </p>
          </div>

          {/* sources */}
          <div className="mt-[32px]">
            <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">Sources</h2>
            <div className="grid grid-cols-1 gap-6">
              {sources?.length > 0 ? (
                sources?.map((source, index) => {
                  return (source?.title || source?.Title) &&
                    (source?.description || source?.Description) ? (
                    <div className="group bg-[#F3F5F7] p-3 rounded-md" key={source?.title}>
                      <p className="text-reportGrey text-[1em] text-base font-medium">
                        {source?.title || source?.Title}
                      </p>
                      <p className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium ">
                        {source?.description || source?.Description}
                      </p>
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
        </div>
        <div>
          <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
            <h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
            <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
              <CustomGaugeChart
                percentage={
                  greenwashRiskPercentage && greenwashRiskPercentage <= 100
                    ? parseInt(greenwashRiskPercentage)
                    : greenwashRiskPercentage > 100
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
                {currentCompany?.GHGEmissions}
              </p>
              <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                Report status
              </p>
              <p className={`text-darkBlack justify-left  text-[1em] md:ml-0 text-base mb-1 `}>
                <span
                  className={` text-white text-center py-1 px-3   rounded-3xl font-medium ${
                    currentCompany?.pending === 'true' && currentCompany?.disregard === 'false'
                      ? 'bg-foggyGrey'
                      : currentCompany?.reviewing === 'true'
                        ? 'bg-review'
                        : currentCompany?.reviewed === 'true'
                          ? 'bg-darkGreen'
                          : currentCompany?.disregard === 'true'
                            ? 'bg-danger'
                            : 'bg-foggyGrey'
                  }`}
                >
                  {currentCompany?.pending === 'true' && currentCompany?.disregard === 'false'
                    ? 'Pending Review'
                    : currentCompany?.reviewing === 'true'
                      ? 'In Review'
                      : currentCompany?.reviewed === 'true'
                        ? 'Reviewed'
                        : currentCompany?.disregard === 'true'
                          ? 'Disregard'
                          : toTitleCase(currentCompany?.status) || 'Generated'}
                </span>
              </p>
              {hash && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">Timestamp</p>
              )}
              {hash && (
                <a className="col-span-1 text-[1em] text-base mb-1 font-medium">{formattedDate}</a>
              )}
              {/* Links */}
              {hash && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                  DeShare Link
                </p>
              )}
              {hash && (
                <a
                  href={`${hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-darkGreen col-span-1 truncate text-[1em]  mb-1 font-medium"
                >
                  {hash}
                </a>
              )}
              {etherscanURL && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
                  Subscan link
                </p>
              )}
              {etherscanURL && (
                <a
                  href={etherscanURL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-darkGreen truncate text-[1em] text-base mb-1 font-medium"
                >
                  {etherscanURL}
                </a>
              )}
            </div>
            {(!hash || !etherscanURL) && (
              <div className="flex flex-row gap-4 w-full">
                <button
                  disabled={isSendingToRegulator}
                  onClick={handleSendToRegulators}
                  className={`${
                    isSendingToRegulator ? 'bg-greyText' : 'bg-darkGreen'
                  } flex-1 rounded-lg py-3 px-3 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]`}
                >
                  Send to blockchain
                </button>
                <Dropdown
                  disabled={isSendingToRegulator}
                  trigger={['click']}
                  menu={{
                    items: [
                      {
                        label: 'Modify Report',
                        onClick: () =>
                          navigate(getRouteWithId(ROUTES.specificReport.edit, currentCompany?.id))
                      },
                      {
                        label: 'Save as PDF',
                        onClick: () =>
                          captureScreen('report-container', currentCompany?.companyName)
                      },
                      { label: 'Remove from DB', onClick: () => deleteCompanyHandler() }
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
            {hash && etherscanURL && (
              <div className="flex flex-row justify-center gap-2 col-span-2 w-full">
                <button
                  onClick={() => captureScreen('report-container', currentCompany?.companyName)}
                  className="bg-primary rounded-lg py-[12px] flex w-full text-center justify-center px-[4px] col-span-1 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]"
                >
                  Download as .pdf
                </button>
                <button
                  onClick={() => deleteCompanyHandler()}
                  className="bg-white border border-darkBlack rounded-lg w-full text-center justify-center flex py-[12px] col-span-1 px-[4px] text-darkBlack text-[16px] font-[600] leading-[24px]"
                >
                  Remove from DB
                </button>
              </div>
            )}
          </div>

          <div className="card_shadow mt-8 gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
            <h2 className="text-[18px] leading-[24px] font-[600]">Documents</h2>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
              <img src="/assets/xls-icon.svg" alt="xls-icon" />
              <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
                <span className="truncate">{currentCompany?.fileName}</span>
              </h2>
            </div>
          </div>
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
                        const response = await axiosInstance.put(
                          `/company/update/${currentCompany?.id}`,
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
                        const response = await axiosInstance().put(
                          `/company/update/${currentCompany?.id}`,
                          {
                            sentToRegulators: val,
                            sendToRegulatorsTimeStamp: formattedDate,
                            pending:
                              (currentCompany?.reviewing === 'false' ||
                                !currentCompany?.reviewing) &&
                              (currentCompany?.reviewed === 'false' || !currentCompany?.reviewed) &&
                              (currentCompany?.disregard === 'false' || !currentCompany?.disregard)
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
        </div>
      </div>
    </div>
  )
}
