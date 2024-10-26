import React from 'react'

export const PromptOutput = ({ output }) => (
  <div className="w-full">
    <span className="text-md text-darkBlack mb-1 font-semibold block">Output</span>
    <div className="w-full h-full bg-[#f5f4f4] rounded-md border border-[#d9d9d9] p-4 overflow-y-scroll">
      {output ? output : 'Run a test to have output'}
    </div>
  </div>
)
