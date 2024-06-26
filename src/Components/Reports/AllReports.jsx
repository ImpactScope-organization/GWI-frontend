import React, { useEffect, useState } from "react";
import { useStepsContext } from "../../Context/StateContext";
import { useGetAllReportsSentToRegulators } from "../../Hooks/reports-hooks";
// src\Hooks\reports-hooks.js
import { handleDateFormat } from "../../utils/date";
import Button from "../button";

const AllReports = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { setStep, allInitializedReports, fetchAllInititalizedReports } =
    useStepsContext();

  const { data: getAllPendingReports, isLoading: pendingReportLoading } =
    useGetAllReportsSentToRegulators();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    (async () => {
      await fetchAllInititalizedReports();
      // if (data.length === 0) {
      //   setStep("step1");
      // }
    })();
  }, []);

  return (
    <div className="w-[90%] mx-auto my-10">
      {/* Top Container */}
      <div className="flex justify-between items-start mb-6">
        {/* Left */}
        <div>
          <h1 className="text-darkBlack font-bold text-3xl mb-1">Companies</h1>
          <p className="subtitle-text ">Overview all of companies here</p>
        </div>
        {/* Right */}
        <Button title="Add new company" onClick={() => setStep("step1")} />
      </div>

      {/* Tabs Container */}
      <div className="flex gap-10 w-fit justify-center item-center mb-8">
        <h1
          onClick={() => handleTabClick(1)}
          className={`cursor-pointer ${
            activeTab === 1
              ? "border-b-[2px] border-primary text-darkBlack font-semibold"
              : "text-[#5f6264]"
          }  pb-1 `}
        >
          Internal reports
        </h1>
        <h1
          onClick={() => handleTabClick(2)}
          className={`cursor-pointer ${
            activeTab === 2
              ? "border-b-[2px] border-primary text-darkBlack font-semibold"
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
          allInitializedReports.length === 0 ? (
            <h1 className="w-[calc(100vw-100px text-center)]">
              Please add a new company
            </h1>
          ) : (
            <Report data={allInitializedReports} activeTab={1} />
          )
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
  const { setStep, sheet, setFilteredCompanyData, getCurrentCompany } =
    useStepsContext();

  const handleNavigate = async (companyID, tab, sheetData = {}) => {
    if (tab === 1) {
      setFilteredCompanyData(sheetData);
      await getCurrentCompany(companyID);
      setStep("specific_report");

      // Return sheetData to use it in other parts of your code
      return sheetData;
    } else if (tab === 2) {
      await getCurrentCompany(companyID);
      setStep("specific_report");
    }
  };
  if (data?.length === 0) {
    return <p>No records found</p>;
  }
  return (
    <>
      {activeTab === 1 &&
        data?.map((report, sheetIndex) => (
          <div
            key={sheetIndex}
            onClick={() =>
              handleNavigate(report?.id, activeTab, sheet, sheetIndex)
            }
            style={{
              boxShadow:
                " 0px 13px 12px -16px rgba(0, 0, 0, 0.05), 0px 0px 12px 0px rgba(0, 0, 0, 0.1)",
            }}
            className="min-w-[31%] p-4 cursor-pointer rounded-xl border border-borderLight  hover:border-black  "
          >
            <p className="mb-2 text-sm text-[#6C7275]">
              {handleDateFormat(report?.createdAt)}
            </p>
            <h1 className="mb-3 text-darkBlack text-2xl font-semibold">
              {report?.companyName}
            </h1>
            <p className="text-[#6C7275] mt-[16px] text-[14px] mr-3 font-medium">
              Jurisdiction :
              <span className="text-darkBlack font-semibold ml-2">
                {report?.jurisdiction}
              </span>
            </p>
          </div>
        ))}

      {activeTab === 2 ? (
        data?.map((report, index) => (
          <div
            key={index}
            onClick={() => handleNavigate(report?.id, activeTab)}
            style={{
              boxShadow:
                " 0px 13px 12px -16px rgba(0, 0, 0, 0.05), 0px 0px 12px 0px rgba(0, 0, 0, 0.1)",
            }}
            className="min-w-[31%] p-4 cursor-pointer rounded-xl border border-borderLight hover:border-black  "
          >
            <p className="mb-2 text-sm text-[#6C7275]">
              {pendingReportLoading
                ? "loading..."
                : report?.sendToRegulatorsTimeStamp &&
                  report?.sendToRegulatorsTimeStamp}
            </p>
            <h1 className="mb-3 text-darkBlack text-2xl font-semibold">
              {report?.companyName}
            </h1>
            <p className="text-[#6C7275] mt-[16px] text-[14px] mr-3 font-medium">
              Jurisdiction :
              <span className="text-darkBlack font-semibold ml-2">
                {pendingReportLoading
                  ? "loading..."
                  : report?.jurisdiction && report?.jurisdiction}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </>
  );
};
