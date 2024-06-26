/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import BackButton from "../Shared/BackButton";
import { useStepsContext } from "../../Context/StateContext";
import { create } from "ipfs-http-client";
import axios from "axios";
import { toast } from "react-toastify";
import { smartContract } from "../../Constants";
import { ethers } from "ethers";
import apiUrl from "../../utils/baseURL";
import { formattedDate } from "../../utils/date";
import { domToPng } from "modern-screenshot";
import { useAddress } from "@thirdweb-dev/react";
import LoadingPage from "../loading";
import CustomGaugeChart from "../gauge-chart";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { Dropdown } from "antd";
import { scoringPagePrompts } from "../../utils/system-prompts";
import { captureScreen, isValidData, toTitleCase } from "../../utils/helpers";
import { RefBerklayDB } from "../../Constants/RefBerklayDB";
import Switch from "react-switch";
import { Input } from "antd";

const { TextArea } = Input;

// IPFS
// const projectId = "2V6620s2FhImATdUuY4dwIAqoI0";
// const projectSecret = "2dcb0a633ee912e06834a43a3083248e";

// const auth =
//   "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

// const ipfs = create({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
// });

// ----------------------------
const SpecificReport = () => {
	const walletAddress = useAddress();

	const {
		setStep,
		currentCompany,
		getCurrentCompany,
		setCurrentCompany,
		filteredCompanyData,
	} = useStepsContext();

	const [isLoading, setIsLoading] = useState(true);
	const [isModifying, setIsModifying] = useState(false);
	const [modifyData, setModifyData] = useState(null);
	const [isDemo, setIsDemo] = useState(() => !!currentCompany?.isDemo ?? false);
	const [isRegulator, setIsRegulator] = useState(() =>
		currentCompany?.sentToRegulators == "true" ? true : false
	);

	// description states
	const [contradictions, setContradictions] = useState(
		() => currentCompany?.contradiction || ""
	);
	const [potentialInconsistencies, setPotentialInconsistencies] = useState(
		() => currentCompany?.potentialInconsistencies || ""
	);
	const [unsubstantiatedClaims, setunsubstantiatedClaims] = useState(
		() => currentCompany?.unsubstantiatedClaims || ""
	);
	// sources states
	const [sources, setsources] = useState(() =>
		isValidData(currentCompany?.sources)
			? JSON.parse(currentCompany?.sources)
			: []
	);

	// greenwashing states
	const [vagueTermsState, setvagueTermsState] = useState(() => ({
		score: 0,
		weight: 20,
		divider: 3,
	}));
	const [lackOfQuantitativeDataState, setlackOfQuantitativeDataState] =
		useState(() => ({
			score: 0,
			weight: 20,
			divider: 3,
		}));
	const [berkleyDBExistanceState, setberkleyDBExistanceState] = useState(
		() => ({
			score: 0,
			weight: 15,
			divider: 1,
		})
	);
	const [scope3EmissionsState, setscope3EmissionsState] = useState(() => ({
		score: 0,
		weight: 15,
		divider: 2,
	}));
	const [externalOffsetState, setexternalOffsetState] = useState(() => ({
		score: 0,
		weight: 15,
		divider: 2,
	}));
	const [netZeroState, setnetZeroState] = useState(() => ({
		score: 0,
		weight: 15,
		divider: 2,
	}));
	// Reporting risk states
	const [targetTimelinesState, settargetTimelinesState] = useState(() => ({
		score: 0,
		weight: 20,
		divider: 1,
	}));
	const [stakeholdersEngagementState, setstakeholdersEngagementState] =
		useState(() => ({
			score: 0,
			weight: 20,
			divider: 3,
		}));
	const [reportsAnnuallyState, setreportsAnnuallyState] = useState(() => ({
		score: 0,
		weight: 15,
		divider: 2,
	}));
	const [
		sustainabilityInformationExistsState,
		setsustainabilityInformationExistsState,
	] = useState(() => ({
		score: 0,
		weight: 15,
		divider: 1,
	}));
	const [materialityAssessmentState, setmaterialityAssessmentState] = useState(
		() => ({
			score: 0,
			weight: 20,
			divider: 1,
		})
	);
	// Greenwash Risk Percentage
	let greenwashRiskPercentage = React.useMemo(() => {
		if (currentCompany?.greenwashRiskPercentage) {
			return currentCompany?.greenwashRiskPercentage;
		}
		return parseInt(
			(vagueTermsState?.score * vagueTermsState?.weight) /
				vagueTermsState?.divider +
				(lackOfQuantitativeDataState?.score *
					lackOfQuantitativeDataState?.weight) /
					lackOfQuantitativeDataState?.divider +
				(reportsAnnuallyState?.score * reportsAnnuallyState?.weight) /
					reportsAnnuallyState?.divider +
				(scope3EmissionsState?.score * scope3EmissionsState?.weight) /
					scope3EmissionsState?.divider +
				(externalOffsetState?.score * externalOffsetState?.weight) /
					externalOffsetState?.divider +
				(netZeroState?.score * netZeroState?.weight) / netZeroState?.divider
		);
	}, [
		currentCompany?.greenwashRiskPercentage,
		vagueTermsState,
		lackOfQuantitativeDataState,
		reportsAnnuallyState,
		scope3EmissionsState,
		externalOffsetState,
		netZeroState,
	]);
	// Reporting Risk Percentage
	let reportingRiskPercentage = React.useMemo(() => {
		if (currentCompany?.reportingRiskPercentage) {
			return currentCompany?.reportingRiskPercentage;
		}
		return parseInt(
			(targetTimelinesState?.score * targetTimelinesState?.weight) /
				targetTimelinesState?.divider +
				(stakeholdersEngagementState?.score *
					stakeholdersEngagementState?.weight) /
					stakeholdersEngagementState?.divider +
				(berkleyDBExistanceState?.score * berkleyDBExistanceState?.weight) /
					berkleyDBExistanceState?.divider +
				(sustainabilityInformationExistsState?.score *
					sustainabilityInformationExistsState?.weight) /
					sustainabilityInformationExistsState?.divider +
				(materialityAssessmentState?.score *
					materialityAssessmentState?.weight) /
					materialityAssessmentState?.divider
		);
	}, [
		currentCompany?.reportingRiskPercentage,
		targetTimelinesState,
		stakeholdersEngagementState,
		berkleyDBExistanceState,
		sustainabilityInformationExistsState,
		materialityAssessmentState,
	]);

	// Print Report
	const [hash, setHash] = useState(() => currentCompany?.IPFSHash || "");
	const [etherscanURL, setEtherscanURL] = useState(
		() => currentCompany?.etherscanURL || ""
	);
	const [isSendingToRegulator, setIsSendingToRegulator] = useState("");

	const handleSendToRegulators = async () => {
		if (!walletAddress) {
			return toast.error("Please connect your wallet first");
		}
		setIsSendingToRegulator(true);
		try {
			const element = document.querySelector("#report-container");
			const dataUrl = await domToPng(element);

			const response = await fetch(dataUrl);
			const blob = await response.blob();
			const file = await new File([blob], "file.png", { type: "image/png" });
			// const imghash = await ipfs.add(file);
			const formData = new FormData();
			formData.append("file", file);

			const fileUploadDeShare = await axios.post(
				"https://d.cess.cloud/file",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
						Accept: "*/*",
						"Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
					},
				}
			);

			const { data } = fileUploadDeShare;
			const deShareLink = `https://${data?.data?.url}`;
			setHash(deShareLink);
			// Making connection to the blockchain, getting signer wallet address and connecting to our smart contract
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(
				smartContract.address,
				smartContract.abi,
				signer
			);

			// calling our smart contract function
			const tx = await contract.addImageHash(`${deShareLink}`);
			const receipt = await tx.wait();
			const txHash = receipt.transactionHash;
			const etherscanUrl = `https://shibuya.subscan.io/tx/${txHash}`;
			setEtherscanURL(etherscanUrl);

			// Sending to regulators
			axios
				.put(`${apiUrl}/api/company/update/${currentCompany?.id}`, {
					// new keys
					age: reportDataUpdate.age,
					priority: reportDataUpdate.priority,
					IPFSHash: deShareLink,
					etherscanURL: etherscanUrl,
					dataSources: filteredCompanyData
						? Object?.keys(filteredCompanyData)
								?.filter((key) => filteredCompanyData[key])
								?.join(", ")
						: "",
				})
				.then((res) => {
					console.log("res: ", res);
					toast.success("Report is updated successfully");
					setIsSendingToRegulator(false);
					// setStep("all_reports");
				})
				.catch((err) => {
					console.log("err: ", err);
					setIsSendingToRegulator(false);
				});
			await getCurrentCompany(currentCompany?.id);
		} catch (error) {
			toast.error(error.message);
			setIsSendingToRegulator(false);
		}
	};

	// update report age priority
	const reportDataUpdate = {
		priority: "Low",
		age: "Recent",
	};

	// // GPT Response

	useEffect(() => {
		if (
			!currentCompany?.contradiction ||
			!currentCompany?.potentialInconsistencies ||
			!currentCompany?.unsubstantiatedClaims ||
			!currentCompany?.greenwashRiskPercentage ||
			!currentCompany?.reportingRiskPercentage
		) {
			loadData();
		} else {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		(async () => {
			if (
				contradictions > "" &&
				potentialInconsistencies > "" &&
				unsubstantiatedClaims > "" &&
				(!currentCompany?.contradiction ||
					!currentCompany?.potentialInconsistencies ||
					!currentCompany?.unsubstantiatedClaims ||
					!currentCompany?.greenwashRiskPercentage ||
					!currentCompany?.reportingRiskPercentage)
			) {
				const response = await axios.put(
					`${apiUrl}/api/company/update/${currentCompany?.id}`,
					{
						contradiction: contradictions,
						potentialInconsistencies,
						unsubstantiatedClaims,
						sources: JSON.stringify(sources),
						greenwashRiskPercentage,
						reportingRiskPercentage,
						status: "generated",
					}
				);
				const { data } = response;
				console.log(
					"===============Saved generated report====================="
				);
				console.log(data);
				console.log("====================================");
				await getCurrentCompany(currentCompany?.id);
			}
		})();
	}, [
		contradictions,
		potentialInconsistencies,
		unsubstantiatedClaims,
		sources,
		greenwashRiskPercentage,
		reportingRiskPercentage,
	]);

	const loadData = async () => {
		try {
			setIsLoading(true);

			// const gptPrompt = await axios.get(`${apiUrl}/api/prompt`);
			const claims = JSON.parse(currentCompany?.claims).slice(0, 7);
			let prompt = `Act as an a sustainablity experts who identifies  potential greenwashing by companies:`;
			let concatenatedData = `companyName:${
				currentCompany?.companyName
			}\n statements: \n${JSON.stringify(claims)}`;

			const group1APIs = [
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.contradictionPrompt,
						content: prompt + scoringPagePrompts?.contradictionPrompt?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.potentialInconsistencies,
						content:
							prompt + scoringPagePrompts?.potentialInconsistencies?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.unsubstantiatedClaims,
						content:
							prompt + scoringPagePrompts?.unsubstantiatedClaims?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.sources,
						content: prompt + scoringPagePrompts?.sources?.content,
					},
				}),
			];

			const [cAPI, piAPI, ucAPI, sourcesAPI] = await Promise.allSettled(
				group1APIs
			);

			// ===============group2APIs===================
			const group2APIs = [
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.vagueTerms,
						content: prompt + scoringPagePrompts?.vagueTerms?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.lackOfQuantitativeData,
						content:
							prompt + scoringPagePrompts?.lackOfQuantitativeData?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: `companyName: ${
						currentCompany?.companyName
					},data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
					systemPrompts: {
						...scoringPagePrompts?.scope3Emissions,
						content: prompt + scoringPagePrompts?.scope3Emissions?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: `companyName: ${
						currentCompany?.companyName
					},data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
					systemPrompts: {
						...scoringPagePrompts?.externalOffset,
						content: prompt + scoringPagePrompts?.externalOffset?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: `companyName: ${
						currentCompany?.companyName
					},data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
					systemPrompts: {
						...scoringPagePrompts?.netZero,
						content: prompt + scoringPagePrompts?.netZero?.content,
					},
				}),
			];

			const [
				vagueTerms,
				lackOfQuantitativeData,
				scope3Emissions,
				externalOffset,
				netZero,
				// ... destructure other API responses here in the same order
			] = await Promise.allSettled(group2APIs);

			// ======================group3APIs===========================
			const group3APIs = [
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: `companyName: ${
						currentCompany?.companyName
					},data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
					systemPrompts: {
						...scoringPagePrompts?.targetTimelines,
						content: prompt + scoringPagePrompts?.targetTimelines?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.stakeholdersEngagement,
						content:
							prompt + scoringPagePrompts?.stakeholdersEngagement?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: `companyName: ${
						currentCompany?.companyName
					},data: ${JSON.stringify(currentCompany?.claims?.slice(0, 7))}`,
					systemPrompts: {
						...scoringPagePrompts?.reportsAnnually,
						content: prompt + scoringPagePrompts?.reportsAnnually?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.sustainabilityInformationExists,
						content:
							prompt +
							scoringPagePrompts?.sustainabilityInformationExists?.content,
					},
				}),
				axios.post(`${apiUrl}/api/gpt/prompt`, {
					targetCompanyName: currentCompany?.companyName,
					description: concatenatedData,
					systemPrompts: {
						...scoringPagePrompts?.materialityAssessment,
						content:
							prompt + scoringPagePrompts?.materialityAssessment?.content,
					},
				}),
			];
			const [
				targetTimelines,
				stakeholdersEngagement,
				reportsAnnually,
				sustainabilityInformationExists,
				materialityAssessment,
				// ... destructure other API responses here in the same order
			] = await Promise.allSettled(group3APIs);

			// ===============Group 1 set responses===================
			setContradictions(cAPI?.value?.data?.response);
			setPotentialInconsistencies(piAPI?.value?.data?.response);
			setunsubstantiatedClaims(ucAPI?.value?.data?.response);
			setsources(
				isValidData(sourcesAPI?.value?.data?.response)
					? JSON.parse(sourcesAPI?.value?.data?.response)
					: []
			);
			// ======================Update Greenwash risk states===========================
			setvagueTermsState((prev) => ({
				...prev,
				score: !isNaN(vagueTerms?.value?.data?.response)
					? Number(vagueTerms?.value?.data?.response)
					: prev?.score,
			}));

			setberkleyDBExistanceState((prev) => ({
				...prev,
				score: RefBerklayDB.includes(currentCompany?.companyName) ? 0 : 1,
			}));

			setlackOfQuantitativeDataState((prev) => ({
				...prev,
				score: !isNaN(lackOfQuantitativeData?.value?.data?.response)
					? Number(lackOfQuantitativeData?.value?.data?.response)
					: prev?.score,
			}));

			setscope3EmissionsState((prev) => ({
				...prev,
				score: !isNaN(scope3Emissions?.value?.data?.response)
					? Number(scope3Emissions?.value?.data?.response)
					: prev?.score,
			}));
			setexternalOffsetState((prev) => ({
				...prev,
				score: !isNaN(externalOffset?.value?.data?.response)
					? Number(externalOffset?.value?.data?.response)
					: prev?.score,
			}));
			setnetZeroState((prev) => ({
				...prev,
				score: !isNaN(netZero?.value?.data?.response)
					? Number(netZero?.value?.data?.response)
					: prev?.score,
			}));

			// ======================Update Reporting risk states===========================
			settargetTimelinesState((prev) => ({
				...prev,
				score: !isNaN(targetTimelines?.value?.data?.response)
					? Number(targetTimelines?.value?.data?.response)
					: prev?.score,
			}));
			setstakeholdersEngagementState((prev) => ({
				...prev,
				score: !isNaN(stakeholdersEngagement?.value?.data?.response)
					? Number(stakeholdersEngagement?.value?.data?.response)
					: prev?.score,
			}));
			setreportsAnnuallyState((prev) => ({
				...prev,
				score: !isNaN(reportsAnnually?.value?.data?.response)
					? Number(reportsAnnually?.value?.data?.response)
					: prev?.score,
			}));
			setsustainabilityInformationExistsState((prev) => ({
				...prev,
				score: !isNaN(sustainabilityInformationExists?.value?.data?.response)
					? Number(sustainabilityInformationExists?.value?.data?.response)
					: prev?.score,
			}));
			setmaterialityAssessmentState((prev) => ({
				...prev,
				score: !isNaN(materialityAssessment?.value?.data?.response)
					? Number(materialityAssessment?.value?.data?.response)
					: prev?.score,
			}));
			setIsLoading(false);

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
		}
	};

	const deleteCompanyHandler = async () => {
		const response = await axios.delete(
			`${apiUrl}/api/company/delete/${currentCompany?.id}`
		);
		const { data } = response;
		if (data?.status === "success") {
			toast.success(data?.message);
			setStep("all_reports");
		} else {
			toast.error("something went wrong while deleting the report");
		}
	};
	const handleInputUpdates = (name, value) => {
		setModifyData((prev) => ({ ...prev, [name]: value }));
	};

	if (isLoading) {
		return (
			<LoadingPage
				title="Please wait..."
				description="Please wait, report is being generated."
			/>
		);
	}
	return (
		<div>
			<BackButton setStep={() => setStep("all_reports")} />

			{/* Specific Report */}
			<div
				id="report-container"
				className="flex flex-col md:flex-row gap-6 my-10 px-16 lg:px-6 max-w-[1120px] mx-auto"
			>
				<div
					style={{
						boxShadow:
							"0px 33px 32px -16px rgba(0, 0, 0, 0.10), 0px 0px 16px 4px rgba(0, 0, 0, 0.04)",
					}}
					className="basis-8/12 max-w-[740px] p-[16px]  mx-auto rounded-2xl "
				>
					{/* Top */}

					<div>
						<p className="leading-[24px] text-sm text-reportGrey font-medium">
							{formattedDate}
						</p>
						<h1 className="leading-[64px] text-darkBlack text-2xl font-bold">
							{currentCompany?.companyName}
						</h1>
						{isModifying && (
							<div className="flex flex-col gap-[16px] mt-[24px]">
								<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
									<p className="text-reportGrey text-[1em] text-base font-medium">
										Jurisdiction
									</p>
									<Input
										variant="borderless"
										value={modifyData?.jurisdiction}
										onChange={(e) =>
											handleInputUpdates("jurisdiction", e.target.value)
										}
										className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
									/>
								</div>
								<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
									<p className="text-reportGrey text-[1em] text-base font-medium">
										Sector
									</p>
									<Input
										variant="borderless"
										value={modifyData?.sector}
										onChange={(e) =>
											handleInputUpdates("sector", e.target.value)
										}
										className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
									/>
								</div>
								<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
									<p className="text-reportGrey text-[1em] text-base font-medium">
										Annual Revenue
									</p>
									<Input
										variant="borderless"
										value={modifyData?.annualRevenue}
										onChange={(e) =>
											handleInputUpdates("annualRevenue", e.target.value)
										}
										className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
									/>
								</div>
								<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
									<p className="text-reportGrey text-[1em] text-base font-medium">
										Employees
									</p>
									<Input
										variant="borderless"
										value={modifyData?.noOfEmployees}
										onChange={(e) =>
											handleInputUpdates("noOfEmployees", e.target.value)
										}
										className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
									/>
								</div>
							</div>
						)}
						{!isModifying && (
							<div className="mt-[16px] grid grid-cols-5 max-w-[60%]">
								<p className="text-reportGrey  col-span-2 text-[1em] text-base mb-1 font-medium">
									Jurisdiction
								</p>
								<p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
									{currentCompany?.jurisdiction}
								</p>
								<p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
									Sector
								</p>
								<p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
									{currentCompany?.sector}
								</p>
								<p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
									Annual Revenue
								</p>
								<p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
									{currentCompany?.annualRevenue}
								</p>
								<p className="text-reportGrey col-span-2 text-[1em] text-base mb-1 font-medium">
									Employees
								</p>
								<p className="text-darkBlack col-span-3 ml-4 text-[1em] text-base mb-1 font-medium">
									{currentCompany?.noOfEmployees?.toLocaleString()}
								</p>
							</div>
						)}
					</div>

					{/* Contradiction */}
					<div
						className={`group  focus-within:border-primary ${
							!isModifying ? "bg-[#F3F5F7]" : "bg-white border border-1"
						} p-3 rounded-lg mt-[32px] mb-[16px]`}
					>
						<p className="text-reportGrey text-[1em] text-base font-medium">
							Contradictions
						</p>
						{isModifying && (
							<TextArea
								variant="borderless"
								autoSize
								value={modifyData?.contradiction}
								onChange={(e) =>
									handleInputUpdates("contradiction", e.target.value)
								}
								className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
							/>
						)}
						{!isModifying && (
							<p
								className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium"
								key={"contradiction"}
							>
								{contradictions &&
									contradictions
										?.split("\n")
										?.filter((item) => item !== "\n")
										?.map((text, index) => (
											<React.Fragment key={`${index}-contradiction`}>
												{text}
												<br />
											</React.Fragment>
										))}
							</p>
						)}
					</div>
					{/*    Potential inconsistencies */}
					<div
						className={`group pointer-events-auto focus-within:border-primary ${
							!isModifying ? "bg-[#F3F5F7]" : "bg-white border border-1"
						} p-3 rounded-lg mt-[32px] mb-[16px]`}
					>
						<p className="text-reportGrey text-[1em] text-base font-medium">
							Potential inconsistencies
						</p>
						{isModifying && (
							<TextArea
								variant="borderless"
								autoSize
								value={modifyData?.potentialInconsistencies}
								onChange={(e) =>
									handleInputUpdates("potentialInconsistencies", e.target.value)
								}
								className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
								rows={20}
							/>
						)}
						{!isModifying && (
							<p className="text-text-darkBlack mt-[8px] text-[1em] text-base font-medium ">
								{potentialInconsistencies > "" &&
									potentialInconsistencies
										?.split("\n")
										?.filter((item) => item !== "\n")
										?.map((text, index) => (
											<React.Fragment key={`${index}-pi`}>
												{text}
												<br />
											</React.Fragment>
										))}
							</p>
						)}
					</div>
					{/* Unsubstantiated claims */}
					<div
						className={`group focus-within:border-primary ${
							!isModifying ? "bg-[#F3F5F7]" : "bg-white border border-1"
						} p-3 rounded-lg mt-[32px] mb-[16px]`}
					>
						<p className="text-reportGrey text-[1em] text-base font-medium">
							Unsubstantiated claims
						</p>
						{isModifying && (
							<TextArea
								variant="borderless"
								autoSize
								value={modifyData?.unsubstantiatedClaims}
								onChange={(e) => {
									handleInputUpdates("unsubstantiatedClaims", e.target.value);
								}}
								className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
								rows={20}
							/>
						)}
						{!isModifying && (
							<p className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium ">
								{unsubstantiatedClaims &&
									unsubstantiatedClaims
										?.split("\n")
										?.filter((item) => item !== "\n")
										?.map((text, index) => (
											<React.Fragment key={`${index}-uc`}>
												{text}
												<br />
											</React.Fragment>
										))}
							</p>
						)}
					</div>

					{!isModifying && (
						<div className="mt-[32px]">
							<h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">
								Sources
							</h2>
							<div className="grid grid-cols-1 gap-6">
								{sources?.length > 0 ? (
									sources?.map((source, index) => {
										return (source?.title || source?.Title) &&
											(source?.description || source?.Description) ? (
											<div
												className="group bg-[#F3F5F7] p-3 rounded-md"
												key={source?.title}
											>
												<p className="text-reportGrey  line-clamp-1 group-hover:line-clamp-none text-[1em] text-base font-medium">
													#{index + 1} {source?.title || source?.Title}
												</p>
												<p className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium ">
													{source?.description || source?.Description}
												</p>
											</div>
										) : (
											<React.Fragment key={`${index}-empty`} />
										);
									})
								) : (
									<p className="text-darkBlack mt-[8px] text-[1em] text-base  font-medium">
										No data found
									</p>
								)}
							</div>
						</div>
					)}
					{isModifying && modifyData?.sources?.length > 0 && (
						<div className="grid grid-cols-1 gap-6">
							{modifyData?.sources?.map((source, index) => {
								return (
									<div className="mt-[32px]" key={`${index}-edit-source`}>
										<h2 className="text-[18px] mb-[16px] leading-[24px] font-[600]">
											Source {index + 1}
										</h2>
										<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
											<p className="text-reportGrey text-[1em] text-base font-medium">
												Heading
											</p>
											<Input
												type="text"
												variant="borderless"
												value={source?.title || source?.Title}
												onChange={(e) => {
													setModifyData((prev) => ({
														...prev,
														sources: prev?.sources?.map((cSource, cIndex) => {
															if (cIndex === index) {
																if (cSource.hasOwnProperty("title")) {
																	return {
																		...cSource,
																		title: e.target.value,
																	};
																} else {
																	return {
																		...cSource,
																		Title: e.target.value,
																	};
																}
															}
															return cSource;
														}),
													}));
												}}
												className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
											/>
										</div>
										<div className="focus-within:border-primary rounded-lg mt-[16px] p-[16px] border border-1 focus-withing:border-primary">
											<p className="text-reportGrey text-[1em] text-base font-medium">
												Text
											</p>
											<TextArea
												type="text"
												autoSize
												variant="borderless"
												value={source?.description || source?.Description}
												onChange={(e) => {
													setModifyData((prev) => ({
														...prev,
														sources: prev?.sources?.map((cSource, cIndex) => {
															if (cIndex === index) {
																if (cSource.hasOwnProperty("Description")) {
																	return {
																		...cSource,
																		Description: e.target.value,
																	};
																} else {
																	return {
																		...cSource,
																		description: e.target.value,
																	};
																}
															}
															return cSource;
														}),
													}));
												}}
												className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
											/>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
				<div>
					{isModifying && (
						<div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
							<h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
							<div className="flex flex-col gap-[16px] my-[24px]">
								<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
									<p className="text-reportGrey text-[1em] text-base font-medium">
										Greenwashing risk
									</p>
									<div className="flex items-center gap-1 mt-[8px]">
										<input
											type="number"
											min={0}
											max={100}
											// variant="borderless"
											value={modifyData?.greenwashRiskPercentage}
											onChange={(e) => {
												e.preventDefault();
												if (e.target.value <= 100 && e.target.value >= 0) {
													handleInputUpdates(
														"greenwashRiskPercentage",
														e.target.value
													);
												}
											}}
											// suffix={<p className="text-reportGrey">%</p>}
											className="w-full border-none p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden focus:border-none focus:outline-none"
										/>
										<p className="text-reportGrey">%</p>
									</div>
								</div>
								<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
									<p className="text-reportGrey text-[1em] text-base font-medium">
										Reporting risk
									</p>
									<div className="flex items-center gap-1 mt-[8px]">
										<input
											type="number"
											min={0}
											max={100}
											value={modifyData?.reportingRiskPercentage}
											onChange={(e) => {
												e.preventDefault();
												if (e.target.value <= 100 && e.target.value >= 0) {
													handleInputUpdates(
														"reportingRiskPercentage",
														e.target.value
													);
												}
											}}
											className="w-full border-none p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden focus:border-none focus:outline-none"
										/>
										<p className="text-reportGrey">%</p>
									</div>
								</div>
								<div className="focus-within:border-primary rounded-lg p-[16px] border border-1 focus-withing:border-primary">
									<p className="text-reportGrey text-[1em] text-base font-medium">
										GHG emissions
									</p>
									<Input
										type="text"
										variant="borderless"
										value={modifyData?.GHGEmissions}
										onChange={(e) => {
											handleInputUpdates("GHGEmissions", e.target.value);
										}}
										className="w-full border-none mt-[8px] p-0 text-[1em] text-base  font-medium leading-[24px] text-darkBlack overflow-hidden"
									/>
								</div>
							</div>
							<div className="flex items-center gap-4 ">
								<button
									onClick={async () => {
										if (modifyData?.contradiction === "") {
											return toast.warn(
												"Contradictions field cannot be empty."
											);
										} else if (modifyData?.potentialInconsistencies === "") {
											return toast.warn(
												"Potential Inconsistencies field cannot be empty."
											);
										} else if (modifyData?.unsubstantiatedClaims === "") {
											return toast.warn(
												"Unsubstantiated Claims field cannot be empty."
											);
										} else if (
											!modifyData?.greenwashRiskPercentage &&
											typeof modifyData?.greenwashRiskPercentage !== typeof 1
										) {
											return toast.warn(
												"Greenwash Risk  field cannot be empty."
											);
										} else if (
											!modifyData?.reportingRiskPercentage &&
											typeof modifyData?.reportingRiskPercentage !== typeof 1
										) {
											return toast.warn(
												"Reporting Risk field cannot be empty."
											);
										} else if (modifyData?.jurisdiction === "") {
											return toast.warn("Jurisdiction field cannot be empty.");
										} else if (modifyData?.sector === "") {
											return toast.warn("Sector field cannot be empty.");
										} else if (modifyData?.annualRevenue === "") {
											return toast.warn(
												"Annual Revenue field cannot be empty."
											);
										} else if (modifyData?.noOfEmployees === "") {
											return toast.warn(
												"no.of employees field cannot be empty."
											);
										} else if (modifyData?.GHGEmissions === "") {
											return toast.warn("GHG Emissions field cannot be empty.");
										}
										try {
											const response = await axios.put(
												`${apiUrl}/api/company/update/${currentCompany?.id}`,
												{
													...modifyData,
													sources: JSON.stringify(modifyData?.sources),
												}
											);
											const { data } = response;
											if (data) {
												toast.success("Successfully updated the report.");
											}
											await getCurrentCompany(currentCompany?.id);
											setContradictions(modifyData?.contradiction);
											setPotentialInconsistencies(
												modifyData?.potentialInconsistencies
											);
											setunsubstantiatedClaims(
												modifyData?.unsubstantiatedClaims
											);
											setsources(modifyData?.sources);

											setModifyData(null);
										} catch (error) {
											toast.error(
												"Something went wrong while updating the report."
											);
											setModifyData(null);
										}
										setIsModifying(false);
									}}
									className="bg-primary rounded-lg py-[12px] flex w-full justify-center text-[#fff] text-[16px] font-[600] leading-[24px]"
								>
									Update report
								</button>
								<button
									className="bg-transparent border border-darkBlack rounded-lg py-[12px] px-[4px] flex w-full justify-center text-darkBlack text-[16px] font-[600] leading-[24px]"
									onClick={() => {
										setModifyData(null);
										setIsModifying(false);
									}}
								>
									Cancel
								</button>
							</div>
						</div>
					)}
					{!isModifying && (
						<div className="card_shadow rounded-2xl flex basis-4/12 flex-col gap-1 py-4 px-3">
							<h5 className="text-[18px] leading-[24px] font-[600]">Report</h5>
							<div className="overflow-hidden w-full px-2 flex justify-center items-center ">
								<CustomGaugeChart
									percentage={
										greenwashRiskPercentage && greenwashRiskPercentage <= 100
											? parseInt(greenwashRiskPercentage)
											: greenwashRiskPercentage > 100
											? 99
											: 0
									}
								/>
							</div>
							{/* Cols */}
							<div className="mt-[24px] grid grid-cols-2 lg:max-w-[370px]  gap-2 my-3 ">
								<p className="text-reportGrey   text-[1em] text-base mb-1 font-medium">
									Reporting risk
								</p>
								<div className="flex flex-row  items-center gap-[4px] flex-nowrap">
									{Array.from({ length: 10 }).map((_item, index) => {
										return (
											<div
												key={`${index}-bar`}
												className={`w-[4px] h-[14px] rounded-sm ${
													(index + 1) * 10 <= parseInt(reportingRiskPercentage)
														? "bg-darkGreen"
														: "bg-reportGrey "
												}`}
											></div>
										);
									})}
									<p className="text-darkBlack ml-[8px] text-[1em] text-base font-medium">
										{parseInt(reportingRiskPercentage)}%
									</p>
								</div>
								<p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
									GHG emissions
								</p>
								<p className="text-darkBlack  text-[1em] text-base mb-1 font-medium">
									{currentCompany?.GHGEmissions}
								</p>
								<p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
									Report status
								</p>
								<p
									className={`text-darkBlack justify-left  text-[1em] md:ml-0 text-base mb-1 `}
								>
									<span
										className={` text-white text-center py-1 px-3   rounded-3xl font-medium ${
											currentCompany?.pending === "true" &&
											currentCompany?.disregard === "false"
												? "bg-foggyGrey"
												: currentCompany?.reviewing === "true"
												? "bg-review"
												: currentCompany?.reviewed === "true"
												? "bg-darkGreen"
												: currentCompany?.disregard === "true"
												? "bg-danger"
												: "bg-foggyGrey"
										}`}
									>
										{currentCompany?.pending === "true" &&
										currentCompany?.disregard === "false"
											? "Pending Review"
											: currentCompany?.reviewing === "true"
											? "In Review"
											: currentCompany?.reviewed === "true"
											? "Reviewed"
											: currentCompany?.disregard === "true"
											? "Disregard"
											: toTitleCase(currentCompany?.status) || "Generated"}
									</span>
								</p>
								{hash && (
									<p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
										Timestamp
									</p>
								)}
								{hash && (
									<a className="col-span-1 text-[1em] text-base mb-1 font-medium">
										{formattedDate}
									</a>
								)}
								{/* Links */}
								{hash && (
									<p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
										DeShare Link
									</p>
								)}
								{hash && (
									<a
										href={`${hash}`}
										target="_blank"
										rel="noreferrer"
										className="text-darkGreen col-span-1 truncate text-[1em]  mb-1 font-medium"
									>
										{hash}
									</a>
								)}
								{etherscanURL && (
									<p className="text-reportGrey  text-[1em] text-base mb-1 font-medium">
										Subscan link
									</p>
								)}
								{etherscanURL && (
									<a
										href={etherscanURL}
										target="_blank"
										rel="noreferrer"
										className="text-darkGreen truncate text-[1em] text-base mb-1 font-medium"
									>
										{etherscanURL}
									</a>
								)}
							</div>
							{(!hash || !etherscanURL) && (
								<div className="flex flex-row gap-4 w-full">
									<button
										disabled={isSendingToRegulator}
										onClick={handleSendToRegulators}
										className={`${
											isSendingToRegulator ? "bg-greyText" : "bg-darkGreen"
										} flex-1 rounded-lg py-3 px-3 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]`}
									>
										Send to blockchain
									</button>
									<Dropdown
										disabled={isSendingToRegulator}
										trigger={["click"]}
										menu={{
											onClick: (e) => {
												if (e.key == 1) {
													captureScreen("report-container");
												} else if (e.key == 2) {
													deleteCompanyHandler();
												} else {
													const data = {
														contradiction: contradictions,
														potentialInconsistencies,
														unsubstantiatedClaims,
														greenwashRiskPercentage: parseInt(
															greenwashRiskPercentage
														),
														reportingRiskPercentage: parseInt(
															reportingRiskPercentage
														),
														jurisdiction: currentCompany?.jurisdiction,
														sector: currentCompany?.sector,
														annualRevenue: currentCompany?.annualRevenue,
														noOfEmployees: currentCompany?.noOfEmployees,
														GHGEmissions: currentCompany?.GHGEmissions,
														sources: sources,
													};
													setModifyData(data);
													setIsModifying(true);
												}
											},
											items: [
												{ label: "Modify Report", key: "0" },
												{
													label: "Save as PDF",
													key: "1",
												},
												{ label: "Remove from DB", key: "2" },
											],
										}}
										placement="bottomRight"
									>
										<div className="py-[12px] px-[18px] rounded-md border bg-transparent flex justify-center items-center">
											<IoEllipsisHorizontalSharp />
										</div>
									</Dropdown>
								</div>
							)}
							{hash && etherscanURL && (
								<div className="flex flex-row justify-center gap-2 col-span-2 w-full">
									<button
										onClick={() => captureScreen("report-container")}
										className="bg-primary rounded-lg py-[12px] flex w-full text-center justify-center px-[4px] col-span-1 border-none outline-none text-[#fff] text-[16px] font-[600] leading-[24px]"
									>
										Download as .pdf
									</button>
									<button
										onClick={() => deleteCompanyHandler()}
										className="bg-white border border-darkBlack rounded-lg w-full text-center justify-center flex py-[12px] col-span-1 px-[4px] text-darkBlack text-[16px] font-[600] leading-[24px]"
									>
										Remove from DB
									</button>
								</div>
							)}
						</div>
					)}
					<div className="card_shadow mt-8 gap-4 rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
						<h2 className="text-[18px] leading-[24px] font-[600]">Documents</h2>
						<div className="flex flex-row flex-nowrap justify-start items-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-2xl">
							<img src="/assets/xls-icon.svg" alt="xls-icon" />
							<h2 className="text-[18px] leading-[24px] mt-1 font-[600]">
								<span className="truncate">{currentCompany?.fileName}</span>
							</h2>
						</div>
					</div>
					{!isModifying && (
						<div className="card_shadow mt-8  rounded-2xl flex basis-4/12 flex-col z-50 p-[16px]">
							<h2 className="text-[18px] leading-[24px] font-[600]">
								Visibility
							</h2>
							<div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
								<div className="flex flex-row gap-2 w-full justify-between">
									<h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
										<span className="truncate">Demo</span>
									</h2>
									<div>
										<Switch
											height={24}
											onChange={async (val) => {
												setIsDemo(val);
												try {
													const response = await axios.put(
														`${apiUrl}/api/company/update/${currentCompany?.id}`,
														{
															isDemo: val,
														}
													);
													const { data } = response;
													if (data) {
														toast.success(
															`Report is ${
																val === false ? "removed from" : "sent to"
															} demo`
														);
													}
												} catch (error) {
													toast.error("Something went wrong.");
												}
											}}
											checked={isDemo}
											checkedIcon={false}
											uncheckedIcon={false}
											onColor="#4DC601"
										/>
									</div>
								</div>
							</div>
							<div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
								<div className="flex flex-row gap-2 w-full justify-between">
									<h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
										<span className="truncate">Regulator</span>
									</h2>
									<div>
										<Switch
											height={24}
											onChange={async (val) => {
												setIsRegulator(val);
												try {
													const response = await axios.put(
														`${apiUrl}/api/company/update/${currentCompany?.id}`,
														{
															sentToRegulators: val,
															sendToRegulatorsTimeStamp: formattedDate,
															pending:
																(currentCompany?.reviewing === "false" ||
																	!currentCompany?.reviewing) &&
																(currentCompany?.reviewed === "false" ||
																	!currentCompany?.reviewed) &&
																(currentCompany?.disregard === "false" ||
																	!currentCompany?.disregard)
																	? "true"
																	: "false",
														}
													);
													const { data } = response;
													if (data) {
														toast.success(
															`Report is ${
																val === false ? "removed from" : "sent to"
															} regulator`
														);
													}
												} catch (error) {
													toast.error("Something went wrong.");
												}
											}}
											checked={isRegulator}
											checkedIcon={false}
											uncheckedIcon={false}
											onColor="#4DC601"
										/>
									</div>
								</div>
							</div>
							<div className="flex flex-row flex-nowrap justify-start items-center gap-2  p-2 rounded-2xl">
								<div className="flex flex-row gap-2 w-full justify-between">
									<h2 className="text-[16px] leading-[24px] mt-1 font-[500]">
										<span className="truncate">Specific Client</span>
									</h2>
									<p className="text-darkBlack ml-4 text-[1em] text-base mb-1 font-medium">
										<span className="py-1 px-3 rounded-3xl bg-foggyGrey">
											coming soon
										</span>
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default SpecificReport;
