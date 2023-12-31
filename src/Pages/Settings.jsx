/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import apiUrl from "../utils/baseURL";

const defaultPrompt =
  "Identify any inconsistencies for ${targetCompanyName} within the data across 'InsigAI,' 'Twitter,' and 'Carbon offsets' sheets. Report conflicting details or misalignments between these sources, if any, in a concise manner. Keep the response within 12 lines.";

const Settings = () => {
  const [promptText, setPromptText] = useState(defaultPrompt);

  useEffect(() => {
    const loadData = async () => {
      const gptPrompt = await axios.get(`${apiUrl}/api/prompt`);
      console.log("--", gptPrompt?.data?.result?.prompt);
      setPromptText(gptPrompt?.data?.result?.prompt);
    };
    loadData();
  }, []);

  const handleSubmit = async () => {
    console.log("promptText", promptText);
    const res = axios
      .put(`${apiUrl}/api/prompt/updatePrompt`, {
        prompt: promptText,
      })
      .then((res) => {
        console.log("res: ", res);
        toast.success("Prompt updated successfully");
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error(err);
      });
  };

  const handleDeleteReports = async () => {
    axios
      .delete(`${apiUrl}/api/report/deleteReports`)
      .then(({ data }) => {
        console.log("res: ", data?.message);
        toast.success(data?.message);
      })
      .catch((err) => {
        console.log("err: ", err);
        toast.error(err);
      });
  };

  return (
    <div className="w-[90%] mx-auto my-7">
      <div>
        <h1 className="font-bold text-4xl mb-2">Settings</h1>
        <p className="text-[#6C7275] font-semibold">
          You can change the prompt at any time or restore its default value
        </p>
      </div>
      {/* Prompt Container */}
      <div className="w-1/2 ml-0 mt-7">
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-bold text-lg">Prompt</h1>
          <h1
            onClick={() => setPromptText(defaultPrompt)}
            className="text-[#3FDD78] font-bold cursor-pointer"
          >
            Restore to default
          </h1>
        </div>

        <div>
          <textarea
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            className="scrollbar w-full p-4 text-[15px] rounded-lg border-[1px] border-[#E8ECEF] min-h-[200px] focus:border-gray-400 focus:border-opacity-50 focus:outline-none"
          />
          <button
            className="py-2 px-6 text-[#fff] rounded-lg font-semibold mt-3 bg-[#3FDD78] border-none outline-none"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
      {/* Delete Database Button Container */}
      {/* <div className="mt-7">
        <h1 className="font-bold text-lg">Database</h1>
        <p className="text-[#6C7275] ">
          The button bellow will remove all generated reports
        </p>
        <button
          className="py-2 px-6 text-[#E53B3B] border-[#E53B3B] rounded-lg font-semibold mt-3 border-2 outline-none"
          onClick={handleDeleteReports}
        >
          Clean database{" "}
        </button>
      </div> */}
    </div>
  );
};

export default Settings;
