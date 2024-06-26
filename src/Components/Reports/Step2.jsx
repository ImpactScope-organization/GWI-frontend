/* eslint-disable no-loop-func */
import React, { useRef, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import Loading from "../Shared/Loading";
import * as XLSX from "xlsx"; // Import the xlsx library
import { toast } from "react-toastify";
import axios from "axios";
import { transformArrayOfObjects } from "../../utils/helpers";
import Button from "../button";
import apiUrl from "../../utils/baseURL";

const Step2 = () => {
  const fileInputRef = useRef(null);
  const { processing, setProcessing, setStep, setSheet } = useStepsContext();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileProgress, setFileProgress] = useState({});

  const handleCreateCompany = async (sheetData) => {
    try {
      const payload = {
        companyName: sheetData?.Company[0]?.name,
        jurisdiction: sheetData?.Company[0]?.jurisdiction,
        sector: sheetData?.Company[0]?.sector,
        annualRevenue: sheetData?.Company[0]?.["annual revenue"],
        noOfEmployees: sheetData?.Company[0]?.employees,
        GHGEmissions: sheetData?.Company[0]?.["ghg emissions"],
        claims: JSON.stringify(sheetData?.Claims.slice(0, 30)),
        fileName: sheetData?.file?.name,
      };
      const response = await axios.post(
        `${apiUrl}/api/company/create`,
        payload
      );
      toast.success("Company is created successfully");
      return response;
    } catch (error) {
      const errMessage =
        error?.response?.data?.message ||
        error?.message ||
        `something went wrong while creating company "${sheetData?.company?.name}"`;
      toast.error(errMessage);
      return errMessage;
    }
  };
  const processDataFromFiles = async () => {
    try {
      let allSheetDataArray = [];

      for (const file of selectedFiles) {
        let allSheetData = {}; // Initialize an empty object to store all rows from all sheets and files
        const reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
          reader.onload = async (e) => {
            try {
              const data = new Uint8Array(e.target.result);
              const workbook = XLSX.read(data, { type: "array" });

              for (const sheetName of workbook.SheetNames) {
                const sheet = workbook.Sheets[sheetName];
                let rows = XLSX.utils.sheet_to_json(sheet);
                if (
                  sheetName.toLocaleLowerCase() === "company" &&
                  rows.length > 0
                ) {
                  rows = transformArrayOfObjects(rows);
                }
                // Accumulate rows by sheet name
                allSheetData[sheetName] = allSheetData[sheetName]
                  ? [...allSheetData[sheetName], ...rows]
                  : [...rows];
              }
              resolve();
            } catch (error) {
              reject(error);
            }
          };
        });
        reader.readAsArrayBuffer(file);
        await promise; // Wait for each file to be processed before moving to the next
        await handleCreateCompany({ ...allSheetData, file });
        allSheetDataArray.push({ ...allSheetData, file });
      }

      setSheet(allSheetDataArray);
      // console.log("setSheetData: ", setSheetData);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const handleFileChange = (event) => {
    console.log("Hello");
    const newSelectedFiles = Array.from(event.target.files);
    setSelectedFiles([...selectedFiles, ...newSelectedFiles]);

    newSelectedFiles.forEach((file) => {
      setFileProgress((prevProgress) => ({
        ...prevProgress,
        [file.name]: 0,
      }));

      simulateFileUploadProgress(file);
    });
  };

  const simulateFileUploadProgress = (file) => {
    let progress = 0;

    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        setFileProgress((prevProgress) => ({
          ...prevProgress,
          [file.name]: progress,
        }));
      } else {
        clearInterval(interval); // Clear the interval when progress reaches 100%
      }
    }, 200);
  };

  const handleDeleteFile = (fileName) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
    setFileProgress((prevProgress) => {
      const updatedProgress = { ...prevProgress };
      delete updatedProgress[fileName];
      return updatedProgress;
    });
  };

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileConfirm = async () => {
    if (selectedFiles.length === 0) {
      return toast.error("Please upload dataset first");
    }

    setProcessing(true);
    await processDataFromFiles();
    setTimeout(() => {
      setStep("all_reports");
      setProcessing(false);
    }, 2000);
  };

  return (
    <>
      {processing ? (
        <Loading title="Please wait, data source is being processed" />
      ) : (
        <div className="pb-10">
          <BackButton setStep={() => setStep("step1")} />
          <div className="grid w-full min-h-[75vh] ">
            <div className="w-1/2 mx-auto flex justify-center items-center flex-col">
              <h1 className="text-darkBlack font-bold text-3xl leading-[64px] mb-1">
                Add new company
              </h1>
              <p className="subtitle-text ">
                Download the data source file to get started
              </p>
              {/* File Upload */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                <div
                  onClick={handleFileClick}
                  className="w-[512px] h-[208px] rounded-lg shadow-xl cursor-pointer bg-white p-[12px]"
                >
                  <div className="w-full h-full border border-4 border-dashed rounded-lg border-[#DCDEE5] flex flex-col items-center justify-between p-[16px]">
                    <div className="bg-lightgrey rounded-full p-[22px]">
                      <img src="/assets/upload-icon.svg" />
                    </div>
                    <h1 className="text-darkGrey font-[600] text-[24px] leading-[40px]">
                      Upload the source file
                    </h1>
                    <p className="text-[#8A929D] text-[16px] font-md leading-[24px]">
                      .xlsx up to 1GB
                    </p>
                  </div>
                </div>
              </div>
              {/* File Progress */}
              {selectedFiles?.map((file) => (
                <div
                  key={file.name}
                  className="grid grid-cols-[80%,70px] w-[512px] mx-auto rounded-xl border-[2px] border-[#E8ECEF] mt-10 p-3 justify-center"
                >
                  <div className="">
                    <h1 className="font-semibold mb-0 text-darkBlack">
                      {file.name}
                    </h1>
                    <p className="font-semibold mt-0 text-sm text-[#808080]">
                      {Math.round(file.size / 1024)} KB
                    </p>
                    <div className="bg-gray-200 h-3 rounded-full overflow-hidden w-full mt-2">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: `${fileProgress[file.name] || 0}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="">
                    <img
                      onClick={() => handleDeleteFile(file.name)}
                      src="/assets/delete.svg"
                      alt="logo"
                      className="mx-auto cursor-pointer"
                    />
                    <p className="text-center mt-2 text-base">
                      {fileProgress[file.name] || 0}%
                    </p>
                  </div>
                </div>
              ))}

              {selectedFiles?.length > 0 && (
                <Button
                  title="Confirm"
                  onClick={handleFileConfirm}
                  classes="mt-10"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Step2;
