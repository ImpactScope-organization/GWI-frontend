import React from 'react'
import Step1 from '../../Components/Reports/Step1'
import { useStepsContext } from '../../Context/StateContext'
import Step2 from '../../Components/Reports/Step2'
import AllReports from './AllReports'
import SpecificReport from '../../Components/Reports/SpecificReport'
import SentToRegulators from '../../Components/Reports/SentToRegulators'

const ReportsOld = () => {
  const { step } = useStepsContext()

  return (
    <div>
      {step === 'step1' && <Step1 />}
      {step === 'step2' && <Step2 />}
      {/* <AllReports /> */}
      {step === 'specific_report' && <SpecificReport />}
      {step === 'sent_to_regulators' && <SentToRegulators />}
    </div>
  )
}

export default ReportsOld
