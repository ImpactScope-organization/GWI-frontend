import React, { useState } from "react";
import { allReportsData, allReportsSentToRegulatorsData } from "../../data";

const AllReports = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

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
        <button className="bg-[#3FDD78] text-lg rounded-lg  py-3 px-3 border-none outline-none text-[#fff] ">
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
          <Report data={allReportsData} />
        ) : (
          <Report data={allReportsSentToRegulatorsData} />
        )}
      </div>
    </div>
  );
};

export default AllReports;

const Report = ({ data }) => {
  return (
    <>
      {data.map((report, index) => (
        <div
          style={{
            boxShadow:
              " 0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
          }}
          className="min-w-[31%] p-4 cursor-pointer rounded-xl hover:border-[1px] hover:border-black  "
        >
          <p className="mb-2 text-sm text-[#6C7275]">{report.date}</p>
          <h1 className="mb-3 text-[#000] text-xl font-semibold">
            {report.companyName}
          </h1>
          <p className="text-[#6C7275] text-base">
            Jurisdiction :
            <span className="text-[#000] font-semibold ml-2">
              {report.jurisdiction}
            </span>
          </p>
        </div>
      ))}
    </>
  );
};
