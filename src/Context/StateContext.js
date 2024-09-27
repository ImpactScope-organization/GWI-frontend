import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "../utils/baseURL";
import { toast } from "react-toastify";

// Create the context
const StepsContext = createContext();

// Create a provider component
export function StepsProvider({ children }) {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [step, setStep] = useState("step1");
  // const [step, setStep] = useState("step1");
  const [specificReportDetailsID, setSpecificReportDetailsID] = useState("");
  const [processing, setProcessing] = useState(false);
  const [showAllReports, setShowAllReports] = useState(false);
  const [rows, setRows] = useState();
  const [currentCompany, setCurrentCompany] = useState({
    currentCompanyData: "",
    claims: "",
    index: "",
  });
  const [currentCountry, setCurrentCountry] = useState();

  const [description, setDescription] = useState();
  const [sheet, setSheet] = useState();
  const [filteredCompanyData, setFilteredCompanyData] = useState();
  const [isReportGenerating, setIsReportGenerating] = useState(false);
  // All initialized reports
  const [allInitializedReports, setAllInitializedReports] = useState([]);

  useEffect(() => {
    (async () => {
      const results = await fetchAllInititalizedReports();
      if (results?.length > 0) {
        setStep("all_reports");
      }
    })();
    return () => {
      setAllInitializedReports([]);
    };
  }, []);

  const fetchAllInititalizedReports = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/company/all`);
      const { data } = response;
      setAllInitializedReports(data?.results);
      return data?.results;
    } catch (error) {
      toast.error("Something went wrong while pulling records of companies");
    }
  };

  const getCurrentCompany = async (companyID) => {
    const response = await axios.get(`${apiUrl}/api/company/${companyID}`);
    const { data } = response;
    setCurrentCompany(data?.result);
  };

  const updateSheet = (sheetIndex, values) => {
    const updatedSheet = [...sheet].map((sheetData, index) => {
      if (index === sheetIndex) {
        return {
          ...sheetData,
          generatedReport: { ...values },
        };
      } else {
        return sheetData;
      }
    });
    setSheet(updatedSheet);
  };

  return (
    <StepsContext.Provider
      value={{
        step,
        openLoginModal,
        setOpenLoginModal,
        requestLoading,
        setRequestLoading,
        setStep,
        specificReportDetailsID,
        setSpecificReportDetailsID,
        processing,
        setProcessing,
        showAllReports,
        setShowAllReports,
        rows,
        setRows,
        currentCompany,
        setCurrentCompany,
        description,
        setDescription,
        sheet,
        setSheet,
        filteredCompanyData,
        setFilteredCompanyData,
        currentCountry,
        setCurrentCountry,
        updateSheet,
        isReportGenerating,
        setIsReportGenerating,
        allInitializedReports,
        setAllInitializedReports,
        fetchAllInititalizedReports,
        getCurrentCompany,
      }}
    >
      {children}
    </StepsContext.Provider>
  );
}

// Custom hook to access the context
export function useStepsContext() {
  return useContext(StepsContext);
}
