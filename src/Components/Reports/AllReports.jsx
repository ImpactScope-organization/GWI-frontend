import React, { useEffect, useState } from "react";
import { useStepsContext } from "../../Context/StateContext";
import axios from "axios";
import { useGetAllPendingReports } from "../../Hooks/reports-hooks";
// src\Hooks\reports-hooks.js
import { formattedDate } from "../../utils/date";
import PriorityColor from "./PriorityColor";
import LoadingPage from "../loading";
import apiUrl from "../../utils/baseURL";
import { scoringPagePrompts } from "../../utils/system-prompts";

const AllReports = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const { setStep, sheet } = useStepsContext();

  const { data: getAllPendingReports, isLoading: pendingReportLoading } =
    useGetAllPendingReports();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // useEffect(() => {
  //   const loadData = () => {
  //     console.log("sheet: ", sheet);

  //     let newFilteredData = [];

  //     // Iterate over the keys in sheet
  //     for (const key in sheet) {
  //       if (Object.hasOwnProperty.call(sheet, key)) {
  //         const arrayForCurrentKey = sheet[key];

  //         // Iterate over the array for the current key
  //         for (const item of arrayForCurrentKey) {
  //           // Check if item.Company is already present in newFilteredData
  //           const isPresent = newFilteredData.some(
  //             (jack) => jack.Company === item.Company
  //           );
  //           if (!isPresent) {
  //             // If it's not present, push it into newFilteredData
  //             newFilteredData.push(item);
  //           }
  //         }
  //       }
  //     }

  //     // console.log("Filtered data:", newFilteredData);

  //     // Update the state
  //     setFilteredData(newFilteredData);
  //     // console.log("filteredData: ", newFilteredData);
  //   };
  //   loadData();
  // }, [sheet]);

  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Top Container */}
      <div className="flex justify-between items-start mb-6">
        {/* Left */}
        <div>
          <h1 className="text-[#000] font-bold text-3xl mb-1">Reports</h1>
          <p className="text-[#0000007f] text-lg font-semibold mb-7">
            Overview all of the Greenwashing reports here
          </p>
        </div>
        {/* Right */}
        <button
          onClick={() => setStep("step1")}
          className="bg-[#3FDD78] text-lg rounded-lg  py-3 px-3 border-none outline-none text-[#fff] "
        >
          Upload source file
        </button>
      </div>

      {/* Tabs Container */}
      <div className="flex gap-10 w-fit justify-center item-center mb-8">
        <h1
          onClick={() => handleTabClick(1)}
          className={`cursor-pointer ${
            activeTab === 1
              ? "border-b-[2px] border-[#3FDD78] text-[#000] font-semibold"
              : "text-[#5f6264]"
          }  pb-1 `}
        >
          All reports
        </h1>
        <h1
          onClick={() => handleTabClick(2)}
          className={`cursor-pointer ${
            activeTab === 2
              ? "border-b-[2px] border-[#3FDD78] text-[#000] font-semibold"
              : "text-[#5a5c5e]"
          }  pb-1 `}
        >
          Sent to regulator
        </h1>
      </div>

      {/* Reports Container */}
      <div className="w-full gap-7 grid grid-cols-3">
        {activeTab === 1 ? (
          // All reports
          <Report data={sheet} activeTab={1} />
        ) : (
          // sent to regular tab
          <Report
            data={getAllPendingReports}
            activeTab={2}
            pendingReportLoading={pendingReportLoading}
          />
        )}
      </div>
    </div>
  );
};

export default AllReports;

const Report = ({ data, activeTab, pendingReportLoading }) => {
  const {
    setStep,
    setSpecificReportDetailsID,
    sheet,
    updateSheet,
    setFilteredCompanyData,
    setCurrentCompany,
    setCurrentCountry,
    setIsReportGenerating,
  } = useStepsContext();

  const handleNavigate = async (
    companyName,
    tab,
    sheetData = {},
    sheetIndex
  ) => {
    if (tab === 1) {
      setFilteredCompanyData(sheetData);
      setCurrentCompany({
        company: sheetData?.Company[0],
        claims: sheetData?.Claims,
        generatedReport: sheetData?.generatedReport || {},
        index: sheetIndex,
        file: sheetData?.file,
      });
      setStep("specific_report");

      // Return sheetData to use it in other parts of your code
      return sheetData;
    } else if (tab === 2) {
      setStep("sent_to_regulators");
      setSpecificReportDetailsID(companyName);
    }
  };

  return (
    <>
      {activeTab === 1 &&
        data.map((sheet, sheetIndex) =>
          sheet?.Company.map((report, index) => {
            return (
              <div
                key={sheetIndex}
                onClick={() =>
                  handleNavigate(report?.Company, activeTab, sheet, sheetIndex)
                }
                style={{
                  boxShadow:
                    " 0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
                }}
                className="min-w-[31%] p-4 cursor-pointer rounded-xl hover:border-[1px] hover:border-black  "
              >
                <p className="mb-2 text-sm text-[#6C7275]">{formattedDate}</p>
                <h1 className="mb-3 text-[#000] text-xl font-semibold">
                  {report?.Company || report?.name}
                </h1>
                <p className="text-[#6C7275] text-base">
                  Jurisdiction :
                  <span className="text-[#000] font-semibold ml-2">
                    {report?.jurisdiction}
                  </span>
                </p>
              </div>
            );
          })
        )}

      {activeTab === 2 ? (
        data?.results.map((report, index) => (
          <div
            key={index}
            // onClick={() => setStep("specific_report")}
            onClick={() => handleNavigate(report?._id, activeTab)}
            style={{
              boxShadow:
                " 0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
            }}
            className="min-w-[31%] p-4 cursor-pointer rounded-xl hover:border-[1px] hover:border-black  "
          >
            <p className="mb-2 text-sm text-[#2c2d2e] ">
              {pendingReportLoading
                ? "loading..."
                : report?.sendToRegulatorsTimeStamp &&
                  report?.sendToRegulatorsTimeStamp}
            </p>
            <h1 className="mb-3 text-[#000] text-2xl font-semibold">
              {report?.companyName}
            </h1>
            <p className="text-[#6C7275] mr-3 font-semibold">
              Jurisdiction :
              <span className="text-[#000] font-semibold ml-2">
                {pendingReportLoading
                  ? "loading..."
                  : report?.jurisdiction && report?.jurisdiction}
              </span>
            </p>

            {/* <div className="flex justify-start items-center ">
              <p className="text-[#6C7275] mr-3 font-semibold">Age:</p>
              <label
                htmlFor="freshness"
                className="ml-2 text-[#000] font-semibold"
              >
                {report?.age}
              </label>
            </div>

            <div className="flex justify-start items-center ">
              <p className="text-[#6C7275] mr-3 font-semibold">Priority:</p>

              <div className="flex justify-start items-center">
                <PriorityColor priority={report?.priority} />

                <label
                  htmlFor="potentialgreenwashing"
                  className="ml-2 text-[#000] font-semibold"
                >
                  {report?.priority}
                </label>
              </div>
            </div> */}
          </div>
        ))
      ) : (
        <p>{/* No reports sent to regulators */}</p>
      )}
    </>
  );
};
