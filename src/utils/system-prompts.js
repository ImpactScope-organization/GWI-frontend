// keep the flow according to the scoring page UI.
export const scoringPagePrompts = {
  companyDetails: {
    role: "system",
    content: `
    With the help of online research, Identify the sector, Annual revenue(in USD), number of employees and GHG emissions of the company provided in the data and return the result in the form of an object with keys sector, annualRevenue, totalEmployees, GHGemissions, if not found any detail then return null in value of that key.`,
  },
  contradictionPrompt: {
    role: "system",
    content:
      "Identify up to 3 main contradictions related to greenwashing between claims. Only keep them to 1 sentence each.",
  },
  potentialInconsistencies: {
    role: "system",
    content:
      "Identify up to 3 potential inconsistencies related to greenwashing between claims. Only keep them to 1 sentence each.",
  },
  unsubstantiatedClaims: {
    role: "system",
    content:
      "Identify up to 3 unsubstantiated claims related to greenwashing. Keep the original claim + explanation why it is unsubstantiated in 1 sentence.",
  },
  sources: {
    role: "system",
    content:
      "Identify the sources which has done some announcements mentioned and return an array of object containing title and description",
  },
  // Greenwashing risk
  vagueTerms: {
    role: "system",
    content: `With the help of online research, Return a number from 0 to 3 if the company uses recurring vague claims related to greenwashing. Where 3 is the most frequent level of use. 0 is the lowest usage level. Please just give int numbers not the reason why you choose.`,
  },
  lackOfQuantitativeData: {
    role: "system",
    content: `With the help of online research, Return a number from 0 and 3 if the company does not provide any quantitative data related to sustainability. Where 0 - if the company supports each statement with quantitative data. 3 - if the company does not provide any quantitative data. Please just give int numbers not the reason why you choose.`,
  },
  scope3Emissions: {
    role: "system",
    content: `With the help of online research, Return 0 if the company the company claims its target covers all Scope 3 emissions, in other words its full value chain, including downstream and upstream emissions. Return 1 if the company claims its target covers part of its Scope 3 emissions, for example its upstream (or suppliers) emissions. Return 2 if the company does not include Scope 3 emissions in its target or fails to specify whether it does or not. Please just give int numbers not the reason why you choose.`,
  },
  externalOffset: {
    role: "system",
    content: `With the help of online research, Return 0 if the company has ruled out using external offset credits to meet part of its target. Return 1 if the company plans to use credits to meet part of its target, but provides at least one condition to qualify their use. Return 2 if the company either has not specified details about its planned use of credits or the company plans to use credits without providing any conditions to their use. Please just give int numbers not the reason why you choose.`,
  },
  netZero: {
    role: "system",
    content: `With the help of online research, Return 0 If the company the company has included all four conditions of what is determined as a detailed plan.Please just give int numbers not the reason why you choose.
    1. Measures for all emission scopes that are covered by the target. For example, if the target covers all gases, but the plan only addresses carbon, this would not be met. 
    2. Information on the emission reductions expected from these measures within a certain time period. For example, switching to renewable energy will save XX MT of emissions per year.
    3. Information on the extent to which measures will be applied (e.g. if switching to EVs, what share of the fleet; if installing an own solar PV installation, what is the installed capacity)
    4. Schedule for regular review of measures. Is there a plan for regular review and updating? Return 1 if the company the company has included at least one condition of what we determine as a detailed plan. Return 2 if a plan does not exist as far as we know.`,
  },
  // Reporting Risk
  targetTimelines: {
    role: "system",
    content: `With the help of online research, Return 0 if the company claims its targets with timelines and 1 if doesn't. Please just give int numbers not the reason why you choose.`,
  },
  stakeholdersEngagement: {
    role: "system",
    content: `With the help of online research, Return 0 if the information about stakerholders engagement present and 1 if doesn't. Please just give int numbers not the reason why you choose.`,
  },
  reportsAnnually: {
    role: "system",
    content: `With the help of online research, Return 0 if the company reports annually. Return 1 if the company reports less than annualy. Return 2 if the company does not report. Please just give int numbers not the reason why you choose.`,
  },
  sustainabilityInformationExists: {
    role: "system",
    content: `With the help of online research, Return 0 if the information about sustainability reporting framework (i.e. GRI, Integrated Reporting, SASB, UNGC, etc.) is presented. And 1 if it is not. Please just give int numbers not the reason why you choose.`,
  },
  materialityAssessment: {
    role: "system",
    content: `With the help of online research, Return 0 if the information of materiality assessment in sustainability report is presented. And 1 if it is not. Please just give int numbers not the reason why you choose.`,
  },
};
