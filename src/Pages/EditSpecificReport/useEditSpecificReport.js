import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { isValidData } from '../../utils/helpers'
import axios from 'axios'
import apiUrl from '../../utils/baseURL'
import { RefBerklayDB } from '../../Constants/RefBerklayDB'
import { scoringPagePrompts } from '../../utils/system-prompts'
import { useCompanyContext } from '../../Context/CompanyContext'

export const useEditSpecificReport = () => {
  const { currentCompany, getCurrentCompany } = useCompanyContext()

  const [isLoading, setIsLoading] = useState(true)
  const [isModifying, setIsModifying] = useState(false)
  const [modifyData, setModifyData] = useState(null)

  const { id } = useParams()
  const fetchCompany = useCallback(async () => {
    if (id) {
      setIsLoading(true)
      getCurrentCompany(id)
      setIsLoading(false)
    }
  }, [getCurrentCompany, id])

  useEffect(() => {
    fetchCompany()
  }, [fetchCompany])

  // todo make this better
  useEffect(() => {
    setContradictions(currentCompany?.contradiction)
    setPotentialInconsistencies(currentCompany?.potentialInconsistencies)
    setunsubstantiatedClaims(currentCompany?.unsubstantiatedClaims)
    setsources(isValidData(currentCompany?.sources) ? JSON.parse(currentCompany?.sources) : [])
  }, [currentCompany])

  // description states
  const [contradictions, setContradictions] = useState('')
  const [potentialInconsistencies, setPotentialInconsistencies] = useState('')
  const [unsubstantiatedClaims, setunsubstantiatedClaims] = useState('')
  // sources states
  const [sources, setsources] = useState([])

  // greenwashing states
  const [vagueTermsState, setvagueTermsState] = useState(() => ({
    score: 0,
    weight: 20,
    divider: 3
  }))
  const [lackOfQuantitativeDataState, setlackOfQuantitativeDataState] = useState(() => ({
    score: 0,
    weight: 20,
    divider: 3
  }))
  const [berkleyDBExistanceState, setberkleyDBExistanceState] = useState(() => ({
    score: 0,
    weight: 15,
    divider: 1
  }))
  const [scope3EmissionsState, setscope3EmissionsState] = useState(() => ({
    score: 0,
    weight: 15,
    divider: 2
  }))
  const [externalOffsetState, setexternalOffsetState] = useState(() => ({
    score: 0,
    weight: 15,
    divider: 2
  }))
  const [netZeroState, setnetZeroState] = useState(() => ({
    score: 0,
    weight: 15,
    divider: 2
  }))
  // Reporting risk states
  const [targetTimelinesState, settargetTimelinesState] = useState(() => ({
    score: 0,
    weight: 20,
    divider: 1
  }))
  const [stakeholdersEngagementState, setstakeholdersEngagementState] = useState(() => ({
    score: 0,
    weight: 20,
    divider: 3
  }))
  const [reportsAnnuallyState, setreportsAnnuallyState] = useState(() => ({
    score: 0,
    weight: 15,
    divider: 2
  }))
  const [sustainabilityInformationExistsState, setsustainabilityInformationExistsState] = useState(
    () => ({
      score: 0,
      weight: 15,
      divider: 1
    })
  )
  const [materialityAssessmentState, setmaterialityAssessmentState] = useState(() => ({
    score: 0,
    weight: 20,
    divider: 1
  }))
  // Greenwash Risk Percentage
  let greenwashRiskPercentage = React.useMemo(() => {
    if (currentCompany?.greenwashRiskPercentage) {
      return currentCompany?.greenwashRiskPercentage
    }
    return parseInt(
      (vagueTermsState?.score * vagueTermsState?.weight) / vagueTermsState?.divider +
        (lackOfQuantitativeDataState?.score * lackOfQuantitativeDataState?.weight) /
          lackOfQuantitativeDataState?.divider +
        (reportsAnnuallyState?.score * reportsAnnuallyState?.weight) /
          reportsAnnuallyState?.divider +
        (scope3EmissionsState?.score * scope3EmissionsState?.weight) /
          scope3EmissionsState?.divider +
        (externalOffsetState?.score * externalOffsetState?.weight) / externalOffsetState?.divider +
        (netZeroState?.score * netZeroState?.weight) / netZeroState?.divider
    )
  }, [
    currentCompany?.greenwashRiskPercentage,
    vagueTermsState,
    lackOfQuantitativeDataState,
    reportsAnnuallyState,
    scope3EmissionsState,
    externalOffsetState,
    netZeroState
  ])
  // Reporting Risk Percentage
  let reportingRiskPercentage = React.useMemo(() => {
    if (currentCompany?.reportingRiskPercentage) {
      return currentCompany?.reportingRiskPercentage
    }
    return parseInt(
      (targetTimelinesState?.score * targetTimelinesState?.weight) / targetTimelinesState?.divider +
        (stakeholdersEngagementState?.score * stakeholdersEngagementState?.weight) /
          stakeholdersEngagementState?.divider +
        (berkleyDBExistanceState?.score * berkleyDBExistanceState?.weight) /
          berkleyDBExistanceState?.divider +
        (sustainabilityInformationExistsState?.score *
          sustainabilityInformationExistsState?.weight) /
          sustainabilityInformationExistsState?.divider +
        (materialityAssessmentState?.score * materialityAssessmentState?.weight) /
          materialityAssessmentState?.divider
    )
  }, [
    currentCompany?.reportingRiskPercentage,
    targetTimelinesState,
    stakeholdersEngagementState,
    berkleyDBExistanceState,
    sustainabilityInformationExistsState,
    materialityAssessmentState
  ])

  // // GPT Response

  useEffect(() => {
    if (
      !currentCompany?.contradiction ||
      !currentCompany?.potentialInconsistencies ||
      !currentCompany?.unsubstantiatedClaims ||
      !currentCompany?.greenwashRiskPercentage ||
      !currentCompany?.reportingRiskPercentage
    ) {
      loadData()
    } else {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      if (
        contradictions > '' &&
        potentialInconsistencies > '' &&
        unsubstantiatedClaims > '' &&
        (!currentCompany?.contradiction ||
          !currentCompany?.potentialInconsistencies ||
          !currentCompany?.unsubstantiatedClaims ||
          !currentCompany?.greenwashRiskPercentage ||
          !currentCompany?.reportingRiskPercentage)
      ) {
        const response = await axios.put(`${apiUrl}/api/company/update/${currentCompany?.id}`, {
          contradiction: contradictions,
          potentialInconsistencies,
          unsubstantiatedClaims,
          sources: JSON.stringify(sources),
          greenwashRiskPercentage,
          reportingRiskPercentage,
          status: 'generated'
        })
        const { data } = response
        console.log('===============Saved generated report=====================')
        console.log(data)
        console.log('====================================')
        getCurrentCompany(currentCompany?.id)
      }
    })()
  }, [
    contradictions,
    potentialInconsistencies,
    unsubstantiatedClaims,
    sources,
    greenwashRiskPercentage,
    reportingRiskPercentage,
    currentCompany?.contradiction,
    currentCompany?.potentialInconsistencies,
    currentCompany?.unsubstantiatedClaims,
    currentCompany?.greenwashRiskPercentage,
    currentCompany?.reportingRiskPercentage,
    currentCompany?.id,
    getCurrentCompany
  ])

  const loadData = async () => {
    try {
      setIsLoading(true)

      // const gptPrompt = await axios.get(`${apiUrl}/api/prompt`);
      const claims = JSON.parse(currentCompany?.claims).slice(0, 7)
      const prompt = `Act as an a sustainablity experts who identifies  potential greenwashing by companies:`
      const concatenatedData = `companyName:${
        currentCompany?.companyName
      }\n statements: \n${JSON.stringify(claims)}`

      const group1APIs = [
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.contradictionPrompt,
            content: prompt + scoringPagePrompts?.contradictionPrompt?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.potentialInconsistencies,
            content: prompt + scoringPagePrompts?.potentialInconsistencies?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.unsubstantiatedClaims,
            content: prompt + scoringPagePrompts?.unsubstantiatedClaims?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.sources,
            content: prompt + scoringPagePrompts?.sources?.content
          }
        })
      ]

      const [cAPI, piAPI, ucAPI, sourcesAPI] = await Promise.allSettled(group1APIs)

      // ===============group2APIs===================
      const group2APIs = [
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.vagueTerms,
            content: prompt + scoringPagePrompts?.vagueTerms?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.lackOfQuantitativeData,
            content: prompt + scoringPagePrompts?.lackOfQuantitativeData?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: `companyName: ${
            currentCompany?.companyName
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.scope3Emissions,
            content: prompt + scoringPagePrompts?.scope3Emissions?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: `companyName: ${
            currentCompany?.companyName
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.externalOffset,
            content: prompt + scoringPagePrompts?.externalOffset?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: `companyName: ${
            currentCompany?.companyName
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.netZero,
            content: prompt + scoringPagePrompts?.netZero?.content
          }
        })
      ]

      const [
        vagueTerms,
        lackOfQuantitativeData,
        scope3Emissions,
        externalOffset,
        netZero
        // ... destructure other API responses here in the same order
      ] = await Promise.allSettled(group2APIs)

      // ======================group3APIs===========================
      const group3APIs = [
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: `companyName: ${
            currentCompany?.companyName
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.targetTimelines,
            content: prompt + scoringPagePrompts?.targetTimelines?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.stakeholdersEngagement,
            content: prompt + scoringPagePrompts?.stakeholdersEngagement?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: `companyName: ${
            currentCompany?.companyName
          },data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
          systemPrompts: {
            ...scoringPagePrompts?.reportsAnnually,
            content: prompt + scoringPagePrompts?.reportsAnnually?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.sustainabilityInformationExists,
            content: prompt + scoringPagePrompts?.sustainabilityInformationExists?.content
          }
        }),
        axios.post(`${apiUrl}/api/gpt/prompt`, {
          targetCompanyName: currentCompany?.companyName,
          description: concatenatedData,
          systemPrompts: {
            ...scoringPagePrompts?.materialityAssessment,
            content: prompt + scoringPagePrompts?.materialityAssessment?.content
          }
        })
      ]
      const [
        targetTimelines,
        stakeholdersEngagement,
        reportsAnnually,
        sustainabilityInformationExists,
        materialityAssessment
        // ... destructure other API responses here in the same order
      ] = await Promise.allSettled(group3APIs)

      // ===============Group 1 set responses===================
      setContradictions(cAPI?.value?.data?.response)
      setPotentialInconsistencies(piAPI?.value?.data?.response)
      setunsubstantiatedClaims(ucAPI?.value?.data?.response)
      setsources(
        isValidData(sourcesAPI?.value?.data?.response)
          ? JSON.parse(sourcesAPI?.value?.data?.response)
          : []
      )
      // ======================Update Greenwash risk states===========================
      setvagueTermsState((prev) => ({
        ...prev,
        score: !isNaN(vagueTerms?.value?.data?.response)
          ? Number(vagueTerms?.value?.data?.response)
          : prev?.score
      }))

      setberkleyDBExistanceState((prev) => ({
        ...prev,
        score: RefBerklayDB.includes(currentCompany?.companyName) ? 0 : 1
      }))

      setlackOfQuantitativeDataState((prev) => ({
        ...prev,
        score: !isNaN(lackOfQuantitativeData?.value?.data?.response)
          ? Number(lackOfQuantitativeData?.value?.data?.response)
          : prev?.score
      }))

      setscope3EmissionsState((prev) => ({
        ...prev,
        score: !isNaN(scope3Emissions?.value?.data?.response)
          ? Number(scope3Emissions?.value?.data?.response)
          : prev?.score
      }))
      setexternalOffsetState((prev) => ({
        ...prev,
        score: !isNaN(externalOffset?.value?.data?.response)
          ? Number(externalOffset?.value?.data?.response)
          : prev?.score
      }))
      setnetZeroState((prev) => ({
        ...prev,
        score: !isNaN(netZero?.value?.data?.response)
          ? Number(netZero?.value?.data?.response)
          : prev?.score
      }))

      // ======================Update Reporting risk states===========================
      settargetTimelinesState((prev) => ({
        ...prev,
        score: !isNaN(targetTimelines?.value?.data?.response)
          ? Number(targetTimelines?.value?.data?.response)
          : prev?.score
      }))
      setstakeholdersEngagementState((prev) => ({
        ...prev,
        score: !isNaN(stakeholdersEngagement?.value?.data?.response)
          ? Number(stakeholdersEngagement?.value?.data?.response)
          : prev?.score
      }))
      setreportsAnnuallyState((prev) => ({
        ...prev,
        score: !isNaN(reportsAnnually?.value?.data?.response)
          ? Number(reportsAnnually?.value?.data?.response)
          : prev?.score
      }))
      setsustainabilityInformationExistsState((prev) => ({
        ...prev,
        score: !isNaN(sustainabilityInformationExists?.value?.data?.response)
          ? Number(sustainabilityInformationExists?.value?.data?.response)
          : prev?.score
      }))
      setmaterialityAssessmentState((prev) => ({
        ...prev,
        score: !isNaN(materialityAssessment?.value?.data?.response)
          ? Number(materialityAssessment?.value?.data?.response)
          : prev?.score
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const data = {
      contradiction: contradictions,
      potentialInconsistencies,
      unsubstantiatedClaims,
      greenwashRiskPercentage: parseInt(greenwashRiskPercentage),
      reportingRiskPercentage: parseInt(reportingRiskPercentage),
      jurisdiction: currentCompany?.jurisdiction,
      sector: currentCompany?.sector,
      annualRevenue: currentCompany?.annualRevenue,
      noOfEmployees: currentCompany?.noOfEmployees,
      GHGEmissions: currentCompany?.GHGEmissions,
      sources: sources
    }
    setModifyData(data)
  }, [
    contradictions,
    currentCompany,
    greenwashRiskPercentage,
    potentialInconsistencies,
    reportingRiskPercentage,
    sources,
    unsubstantiatedClaims
  ])

  const handleInputUpdates = (name, value) => {
    setModifyData((prev) => ({ ...prev, [name]: value }))
  }

  return {
    isLoading,
    currentCompany,
    isModifying,
    modifyData,
    handleInputUpdates,
    setModifyData,
    setContradictions,
    setPotentialInconsistencies,
    setunsubstantiatedClaims,
    setsources,
    setIsModifying,
    getCurrentCompany
  }
}
