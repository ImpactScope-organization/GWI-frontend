import React from "react";
import { useStepsContext } from "../../Context/StateContext";

const Step1 = () => {
  const { setStep } = useStepsContext();
  return (
    <div className="grid w-full min-h-[86vh] ">
      <div className="w-1/2 mx-auto flex justify-center items-center flex-col">
        <img src="/assets/step_1.svg" alt="logo" className="mb-3" />
        <h1 className="text-[#8A929D] font-[600] text-[24px] leading-[40px] mb-1">
          You have no companies
        </h1>
        <p className="text-[#7F93A8] font-[500] text-[14px] leading-[24px] mb-7">
          Go ahead and add a new one
        </p>
        <button
          onClick={() => setStep("step2")}
          className="bg-darkGreen text-lg rounded-2xl py-3 px-4 border-none outline-none text-[#fff] "
        >
          Add new company
        </button>
      </div>
    </div>
  );
};

export default Step1;
