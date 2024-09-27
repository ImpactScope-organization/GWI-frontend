import React from "react";
import { useStepsContext } from "../Context/StateContext";
import SpecificReport from "./SpecificReport/SpecificReport";
import SentToRegulators from "./SentToRegulators";

const Reports = () => {
  const { step } = useStepsContext();

  return (
    <div>
      {/* <AllReports /> */}
      {step === "specific_report" && <SpecificReport />}
      {step === "sent_to_regulators" && <SentToRegulators />}
    </div>
  );
};

export default Reports;
