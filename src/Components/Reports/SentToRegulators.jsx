import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { useGetSpecificReportDetails } from "../../Hooks/reports-hooks";
import CustomGaugeChart from "../gauge-chart";
import { isValidData } from "../../utils/helpers";

// ----------------------------
const SentToRegulators = () => {
  const { setStep, specificReportDetailsID } = useStepsContext();

  // getSingleReportDetail;
  const {
    data: specificReportDetailsData,
    isLoading: specificReportDetailsLoading,
  } = useGetSpecificReportDetails(specificReportDetailsID);

  return (
    <div>
      <BackButton setStep={() => setStep("all_reports")} />

      <div
        id="report-container"
        className="flex flex-col md:flex-row gap-6 my-10 px-16 max-w-[1120px] mx-auto"
      >
        <div
          style={{
            boxShadow:
              "0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
          }}
          className="basis-8/12 p-[16px] mx-auto rounded-2xl "
        >
          {/* Top */}

          <div>
            <p className="mb-1 leading-[24px] text-sm text-reportGrey font-medium">
              {specificReportDetailsLoading
                ? "Loading..."
                : specificReportDetailsData?.results?.sendToRegulatorsTimeStamp}
            </p>
            <h1 className="leading-[64px] text-darkBlack text-2xl font-bold">
              {specificReportDetailsLoading
                ? "Loading..."
                : specificReportDetailsData?.results?.companyName}
            </h1>
            <div className="mt-[16px] grid grid-cols-5 max-w-[60%]">
              <p className="text-reportGrey  col-span-2 text-[1em] text-base mb-1 font-md">
                Jurisdiction
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {specificReportDetailsLoading
                  ? "Loading..."
                  : specificReportDetailsData?.results?.jurisdiction}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Sector
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {specificReportDetailsLoading
                  ? "Loading..."
                  : specificReportDetailsData?.results?.sector}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Annual Revenue
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {specificReportDetailsLoading
                  ? "Loading..."
                  : specificReportDetailsData?.results?.anuualRevenue}
              </p>
              <p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-md">
                Employees
              </p>
              <p className="text-blackText col-span-3 ml-4 text-[1em] text-base mb-1 font-md">
                {specificReportDetailsLoading
                  ? "Loading..."
                  : specificReportDetailsData?.results?.noOfEmployees}
              </p>
            </div>
          </div>

          {/* Contradiction */}
          <div className="bg-[#F3F5F7] mt-[32px] p-3 rounded-md mb-5">
            <p className="text-reportGrey text-[1em] text-base font-md">
              Contradictions
            </p>
            <p className="text-blackText mt-[8px] text-[1em] text-base  font-md">
              {specificReportDetailsData?.results?.contradiction &&
                specificReportDetailsData?.results?.contradiction
                  ?.split("\n")
                  ?.filter((item) => item !== "\n")
                  ?.map((text) => (
                    <>
                      {text}
                      <br />
                      <br />
                    </>
                  ))}
            </p>
          </div>
          {/*    Potential inconsistencies */}
          <div className="bg-[#F3F5F7] mt-[32px] p-3 rounded-md mb-5">
            <p className="text-reportGrey text-[1em] text-base font-md">
              Potential inconsistencies
            </p>
            <p className="text-blackText mt-[8px] text-[1em] text-base  font-md ">
              {specificReportDetailsData?.results?.potentialInconsistencies >
                "" &&
                specificReportDetailsData?.results?.potentialInconsistencies
                  ?.split("\n")
                  ?.filter((item) => item !== "\n")
                  ?.map((text) => (
                    <>
                      {text}
                      <br />
                      <br />
                    </>
                  ))}
            </p>
          </div>
          {/* Unsubstantiated claims */}
          <div className="bg-[#F3F5F7] mt-[32px] p-3 rounded-md mb-5">
            <p className="text-reportGrey text-[1em] text-base font-md">
              Unsubstantiated claims
            </p>
            <p className="text-blackText mt-[8px] text-[1em] text-base  font-md ">
              {specificReportDetailsData?.results?.unsubstantiatedClaims &&
                specificReportDetailsData?.results?.unsubstantiatedClaims
                  ?.split("\n")
                  ?.filter((item) => item !== "\n")
                  ?.map((text) => (
                    <>
                      {text}
                      <br />
                      <br />
                    </>
                  ))}
            </p>
          </div>

          <div>
            <h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">
              Sources
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {isValidData(specificReportDetailsData?.results?.sources) &&
              JSON?.parse(specificReportDetailsData?.results?.sources)?.length >
                0 ? (
                isValidData(specificReportDetailsData?.results?.sources) &&
                JSON?.parse(specificReportDetailsData?.results?.sources)?.map(
                  (source, index) => {
                    return (source?.title || source?.Title) &&
                      (source?.description || source?.Description) ? (
                      <div className="group bg-[#F3F5F7] p-3 rounded-md mb-5">
                        <p className="text-reportGrey  line-clamp-1 group-hover:line-clamp-none text-[1em] text-base font-md">
                          #{index + 1} {source?.title || source?.Title}
                        </p>
                        <p className="line-clamp-2 group-hover:line-clamp-none text-blackText mt-[8px] text-[1em] text-base  font-md ">
                          {source?.description || source?.Description}
                        </p>
                      </div>
                    ) : (
                      <></>
                    );
                  }
                )
              ) : (
                <p className="text-blackText mt-[8px] text-[1em] text-base  font-md">
                  No data found
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
            <h5 className="font-medium text-blackText">Report</h5>
            <div className="overflow-hidden w-full px-2 flex justify-center items-center ">
              <CustomGaugeChart
                percentage={
                  (specificReportDetailsData?.results
                    ?.greenwashRiskPercentage &&
                    parseInt(
                      specificReportDetailsData?.results
                        ?.greenwashRiskPercentage
                    )) ||
                  0
                }
              />
            </div>
            {/* Cols */}
            <div className="mt-[16px] grid grid-cols-2 max-w-[370px] gap-2 my-3 ">
              <p className="text-reportGrey   text-[1em] text-base mb-1 font-md">
                Reporting risk
              </p>
              <div className="flex flex-row ml-4 items-center gap-[4px] flex-nowrap">
                {Array.from({ length: 10 }).map((_item, index) => {
                  return (
                    <div
                      className={`w-[4px] h-[14px] rounded-sm ${
                        (index + 1) * 10 <=
                        parseInt(
                          specificReportDetailsData?.results
                            ?.reportingRiskPercentage
                        )
                          ? "bg-darkGreen"
                          : "bg-reportGrey "
                      }`}
                    ></div>
                  );
                })}
                <p className="text-blackText ml-[8px] text-[1em] text-base font-md">
                  {parseInt(
                    specificReportDetailsData?.results?.reportingRiskPercentage
                  )}
                  %
                </p>
              </div>
              <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                GHG emissions
              </p>
              <p className="text-blackText ml-4 text-[1em] text-base mb-1 font-md">
                {specificReportDetailsData?.results?.GHGEmissions}
              </p>
              {specificReportDetailsData?.results?.IPFSHash && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                  Timestamp
                </p>
              )}
              {specificReportDetailsData?.results?.IPFSHash && (
                <a className="col-span-1 ml-4 text-[1em] text-base mb-1 font-md">
                  {specificReportDetailsLoading
                    ? "Loading..."
                    : specificReportDetailsData?.results
                        ?.sendToRegulatorsTimeStamp}
                </a>
              )}
              {/* Links */}
              {specificReportDetailsData?.results?.IPFSHash && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                  IPFS link
                </p>
              )}
              {specificReportDetailsData?.results?.IPFSHash && (
                <a
                  href={`https://ipfs.io/ipfs/${specificReportDetailsData?.results?.IPFSHash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-darkGreen col-span-1 truncate ml-4 text-[1em]  mb-1 font-md"
                >
                  {specificReportDetailsData?.results?.IPFSHash}
                </a>
              )}
              {specificReportDetailsData?.results?.etherscanURL && (
                <p className="text-reportGrey  text-[1em] text-base mb-1 font-md">
                  Etherscan URL
                </p>
              )}
              {specificReportDetailsData?.results?.etherscanURL && (
                <a
                  href={specificReportDetailsData?.results?.etherscanURL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-darkGreen truncate ml-4 text-[1em] text-base mb-1 font-md"
                >
                  {specificReportDetailsData?.results?.etherscanURL}
                </a>
              )}
            </div>
          </div>

          <div className="card_shadow mt-8 gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
            <h2 className="text-[18px] leading-[24px] font-[600]">
              Case Information
            </h2>
            <div className="mt-[16px] grid grid-cols-2 max-w-[370px] gap-2 gap-y-4 my-3 ">
              <p className="text-reportGrey text-[1em] text-base mb-1 font-md">
                Case status
              </p>
              <p className="text-blackText ml-1 text-[1em] text-base mb-1 font-md">
                <span className="py-1 px-3 rounded-3xl bg-foggyGrey">
                  Pending Review
                </span>
              </p>
            </div>
          </div>

          <div className="card_shadow mt-8 gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
            <h2 className="text-[18px] leading-[24px] font-[600]">Documents</h2>
            <div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
              <img src="/assets/xls-icon.svg" alt="xls-icon" />
              <h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
                <span className="truncate">AIB_Group_PLC</span>.xlsx
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentToRegulators;
