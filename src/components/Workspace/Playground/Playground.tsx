// // import { useState, useEffect } from "react";
// // import PreferenceNav from "./PreferenceNav/PreferenceNav";
// // import Split from "react-split";
// // import CodeMirror from "@uiw/react-codemirror";
// // import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// // import { javascript } from "@codemirror/lang-javascript";
// // import EditorFooter from "./EditorFooter";
// // import { Problem } from "@/utils/types/problem";
// // import { useAuthState } from "react-firebase-hooks/auth";
// // import { auth, firestore } from "@/firebase/firebase";
// // import { toast } from "react-toastify";
// // import { problems } from "@/utils/problems";
// // import { useRouter } from "next/router";
// // import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// // import useLocalStorage from "@/hooks/useLocalStorage";
// // import { CopilotKit } from "@copilotkit/react-core";
// // import { CopilotSidebar } from "@copilotkit/react-ui";
// // import "@copilotkit/react-ui/styles.css";
// // import Modal from "react-modal";
// // import { ethers } from "ethers";
// // import { FaEthereum, FaCheckCircle, FaSpinner, FaCopy, FaPlay, FaChevronDown, FaChevronUp } from "react-icons/fa";

// // Modal.setAppElement("#__next");

// // type PlaygroundProps = {
// // 	problem: Problem;
// // 	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
// // 	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
// // };

// // export interface ISettings {
// // 	fontSize: string;
// // 	settingsModalIsOpen: boolean;
// // 	dropdownIsOpen: boolean;
// // }

// // const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
// // 	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
// // 	let [userCode, setUserCode] = useState<string>(problem.starterCode);
// // 	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
// // 	const [showModal, setShowModal] = useState(false);
// // 	const [showAnswerModal, setShowAnswerModal] = useState(false);
// // 	const [showSolutionModal, setShowSolutionModal] = useState(false);
// // 	const [balance, setBalance] = useState<number | null>(null);
// // 	const [isProcessing, setIsProcessing] = useState(false);
// // 	const [txHash, setTxHash] = useState<string>("");
// // 	const [explanationOpen, setExplanationOpen] = useState(false);

// // 	const [settings, setSettings] = useState<ISettings>({
// // 		fontSize: fontSize,
// // 		settingsModalIsOpen: false,
// // 		dropdownIsOpen: false,
// // 	});

// // 	const [user] = useAuthState(auth);
// // 	const {
// // 		query: { pid },
// // 	} = useRouter();

// // 	// Ethereum configuration
// // 	const senderAddress = "0x191607A8120cE3596a89786B2F095Ef48fcF82CC";
// // 	const receiverAddress = "0xfB848B7C5d34E9B17B56E7d6AA9A3427B8AEbbf8";
// // 	const amountToSend = ethers.parseEther("10.0");

// // 	// Correct answer for twoSum problem
// // 	const correctAnswer = `function twoSum(nums, target) {
// //   const seen = {};
// //   for (let i = 0; i < nums.length; i++) {
// //     const complement = target - nums[i];
// //     if (seen.hasOwnProperty(complement)) {
// //       return [seen[complement], i];
// //     }
// //     seen[nums[i]] = i;
// //   }
// // }`;

// // 	const handleSubmit = async () => {
// // 		if (!user) {
// // 			toast.error("Please login to submit your code", {
// // 				position: "top-center",
// // 				autoClose: 3000,
// // 				theme: "dark",
// // 			});
// // 			return;
// // 		}

// // 		try {
// // 			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
// // 			const cb = new Function(`return ${userCode}`)();
// // 			const handler = problems[pid as string].handlerFunction;

// // 			if (typeof handler === "function") {
// // 				const success = handler(cb);
// // 				if (success) {
// // 					toast.success("Congrats! All tests passed!", {
// // 						position: "top-center",
// // 						autoClose: 2000,
// // 						theme: "dark",
// // 					});

// // 					// Award 20 ETH on successful submission
// // 					const newBalance = balance ? balance + 20 : 20;
// // 					setBalance(newBalance);

// // 					setTimeout(() => {
// // 						toast.info(`💸 +20 ETH Credited to your wallet! New Balance: ${newBalance.toFixed(4)} ETH`, {
// // 							position: "top-center",
// // 							autoClose: 3000,
// // 							theme: "dark",
// // 						});
// // 					}, 2000);

// // 					setTimeout(() => {
// // 						setShowModal(true);
// // 					}, 3500);

// // 					setSuccess(true);
// // 					setTimeout(() => setSuccess(false), 4000);

// // 					const userRef = doc(firestore, "users", user.uid);
// // 					await updateDoc(userRef, {
// // 						solvedProblems: arrayUnion(pid),
// // 					});
// // 					setSolved(true);
// // 				}
// // 			}
// // 		} catch (error: any) {
// // 			console.log(error.message);
// // 			if (error.message.startsWith("AssertionError")) {
// // 				toast.error("Oops! One or more test cases failed", {
// // 					position: "top-center",
// // 					autoClose: 3000,
// // 					theme: "dark",
// // 				});
// // 			} else {
// // 				toast.error(error.message, {
// // 					position: "top-center",
// // 					autoClose: 3000,
// // 					theme: "dark",
// // 				});
// // 			}
// // 		}
// // 	};

// // 	const handleShowAnswer = async () => {
// // 		if (!window.ethereum) {
// // 			toast.error("MetaMask is not installed. Please install it to proceed.", {
// // 				position: "top-center",
// // 				autoClose: 3000,
// // 				theme: "dark",
// // 			});
// // 			return;
// // 		}

// // 		setIsProcessing(true);

// // 		try {
// // 			const provider = new ethers.BrowserProvider(window.ethereum);
// // 			const signer = await provider.getSigner();
// // 			const sender = await signer.getAddress();

// // 			if (sender.toLowerCase() !== senderAddress.toLowerCase()) {
// // 				toast.error("Please switch to the correct wallet address in MetaMask.", {
// // 					position: "top-center",
// // 					autoClose: 3000,
// // 					theme: "dark",
// // 				});
// // 				setIsProcessing(false);
// // 				return;
// // 			}

// // 			const tx = await signer.sendTransaction({
// // 				to: receiverAddress,
// // 				value: amountToSend,
// // 			});

// // 			setTxHash(tx.hash);
// // 			toast.info(`Transaction sent! Hash: ${tx.hash}`, {
// // 				position: "top-center",
// // 				autoClose: 5000,
// // 				theme: "dark",
// // 			});

// // 			await tx.wait();
// // 			const newBalance = await provider.getBalance(sender);
// // 			setBalance(Number(ethers.formatEther(newBalance)));

// // 			toast.success("Transaction confirmed! -10 ETH deducted.", {
// // 				position: "top-center",
// // 				autoClose: 3000,
// // 				theme: "dark",
// // 			});

// // 			setShowAnswerModal(true);
// // 		} catch (error: any) {
// // 			console.error("Transaction failed:", error);
// // 			toast.error(`Transaction failed: ${error.message}`, {
// // 				position: "top-center",
// // 				autoClose: 3000,
// // 				theme: "dark",
// // 			});
// // 		} finally {
// // 			setIsProcessing(false);
// // 		}
// // 	};

// // 	const handleCloseAnswerModal = () => {
// // 		setShowAnswerModal(false);
// // 		setShowSolutionModal(true);
// // 	};

// // 	const copyToClipboard = (text: string) => {
// // 		navigator.clipboard.writeText(text).then(() => {
// // 			toast.success("Copied to clipboard!", {
// // 				position: "top-center",
// // 				autoClose: 2000,
// // 				theme: "dark",
// // 			});
// // 		});
// // 	};

// // 	useEffect(() => {
// // 		const code = localStorage.getItem(`code-${pid}`);
// // 		if (user) {
// // 			setUserCode(code ? JSON.parse(code) : problem.starterCode);
// // 		} else {
// // 			setUserCode(problem.starterCode);
// // 		}

// // 		if (window.ethereum) {
// // 			const provider = new ethers.BrowserProvider(window.ethereum);
// // 			provider.getBalance(senderAddress).then((balance) => {
// // 				setBalance(Number(ethers.formatEther(balance)));
// // 			});
// // 		}
// // 	}, [pid, user, problem.starterCode]);

// // 	const onChange = (value: string) => {
// // 		setUserCode(value);
// // 		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
// // 	};

// // 	return (
// // 		<CopilotKit publicApiKey="ck_pub_383e95912191e43428b4edbd6aabba68">
// // 			<div className='flex flex-row bg-dark-layer-1 h-screen'>
// // 				<div className='flex flex-col flex-1 relative overflow-x-hidden'>
// // 					<PreferenceNav settings={settings} setSettings={setSettings} />

// // 					<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
// // 						<div className='w-full overflow-auto'>
// // 							<CodeMirror
// // 								value={userCode}
// // 								theme={vscodeDark}
// // 								onChange={onChange}
// // 								extensions={[javascript()]}
// // 								style={{ fontSize: settings.fontSize }}
// // 							/>
// // 						</div>
// // 						<div className='w-full px-5 overflow-auto'>
// // 							<div className='flex h-10 items-center space-x-6'>
// // 								<div className='relative flex h-full flex-col justify-center cursor-pointer'>
// // 									<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
// // 									<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
// // 								</div>
// // 								<button className='text-sm font-medium leading-5 text-white'>
// // 									Show balance: {balance ? `${balance.toFixed(4)} ETH` : "Loading..."}
// // 								</button>
// // 								<button
// // 									className='text-sm font-medium leading-5 text-white'
// // 									onClick={handleShowAnswer}
// // 									disabled={isProcessing}
// // 								>
// // 									{isProcessing ? "Processing..." : "Show answer: -10 ETH"}
// // 								</button>
// // 							</div>

// // 							<div className='flex'>
// // 								{problem.examples.map((example, index) => (
// // 									<div
// // 										className='mr-2 items-start mt-2'
// // 										key={example.id}
// // 										onClick={() => setActiveTestCaseId(index)}
// // 									>
// // 										<div className='flex flex-wrap items-center gap-y-4'>
// // 											<div
// // 												className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
// //                         ${activeTestCaseId === index ? "text-white" : "text-gray-500"}`}
// // 											>
// // 												Case {index + 1}
// // 											</div>
// // 										</div>
// // 									</div>
// // 								))}
// // 							</div>

// // 							<div className='font-semibold my-4'>
// // 								<p className='text-sm font-medium mt-4 text-white'>Input:</p>
// // 								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
// // 									{problem.examples[activeTestCaseId].inputText}
// // 								</div>
// // 								<p className='text-sm font-medium mt-4 text-white'>Output:</p>
// // 								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
// // 									{problem.examples[activeTestCaseId].outputText}
// // 								</div>
// // 							</div>
// // 						</div>
// // 					</Split>

// // 					<EditorFooter handleSubmit={handleSubmit} />
// // 				</div>

// // 				<CopilotSidebar
// // 					className='w-[1450px]'
// // 					labels={{
// // 						title: "LeetBot",
// // 						initial: "Need help with the code or understanding the problem - LeetBot is here!!!",
// // 					}}
// // 					instructions={`You are an AI assistant helping solve the "${problem.title}" problem or to explain "${problem.problemStatement}" or to complete the code "${problem.starterCode}". Offer code hints, logic explanation, or debugging help.`}
// // 				/>

// // 				{/* Success Modal */}
// // 				<Modal
// // 					isOpen={showModal}
// // 					onRequestClose={() => setShowModal(false)}
// // 					contentLabel="Transaction Simulation"
// // 					style={{
// // 						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
// // 						content: {
// // 							top: "50%",
// // 							left: "50%",
// // 							right: "auto",
// // 							bottom: "auto",
// // 							transform: "translate(-50%, -50%)",
// // 							background: "linear-gradient(to bottom, #1E1E1E, #252526)",
// // 							color: "#D4D4D4",
// // 							borderRadius: "10px",
// // 							padding: "25px",
// // 							width: "600px",
// // 							border: "1px solid #2D2D2D",
// // 							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
// // 						},
// // 					}}
// // 				>
// // 					<div className='flex flex-col items-center'>
// // 						<FaEthereum className='text-4xl mb-4' style={{ color: "#A0A0A0" }} />
// // 						<h2 className='text-2xl font-bold mb-4'>Transaction Confirmed</h2>
// // 						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
// // 							<div className='flex items-center justify-between mb-3'>
// // 								<p className='text-sm flex items-center'>
// // 									<FaCheckCircle className='mr-2' style={{ color: "#A0A0A0" }} />
// // 									<span className='font-semibold'>Status:</span> Confirmed ✅
// // 								</p>
// // 								<p className='text-sm' style={{ color: "#A0A0A0" }}>
// // 									Timestamp: {new Date().toLocaleString()}
// // 								</p>
// // 							</div>
// // 							<p className='text-sm flex items-center mb-2'>
// // 								<FaEthereum className='mr-2' style={{ color: "#A0A0A0" }} />
// // 								<span className='font-semibold'>Amount:</span> +20 ETH
// // 							</p>
// // 							<p className='text-sm mb-2'>
// // 								<span className='font-semibold'>TX Hash:</span> 0x{Math.random().toString(16).substring(2, 10)}
// // 							</p>
// // 							<p className='text-sm mb-2'>
// // 								<span className='font-semibold'>New Balance:</span> {balance ? `${balance.toFixed(4)} ETH` : "Loading..."}
// // 							</p>
// // 							<button
// // 								className='mt-2 px-3 py-1 rounded text-sm font-medium transition-colors'
// // 								style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// // 								onClick={() => window.open("https://fakeexplorer.com/tx/" + Math.random().toString(16).substring(2, 10), "_blank")}
// // 								onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// // 								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// // 							>
// // 								View Details
// // 							</button>
// // 						</div>
// // 						<button
// // 							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
// // 							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// // 							onClick={() => setShowModal(false)}
// // 							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// // 							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// // 						>
// // 							Close
// // 						</button>
// // 					</div>
// // 				</Modal>

// // 				{/* Show Answer Transaction Modal */}
// // 				<Modal
// // 					isOpen={showAnswerModal}
// // 					onRequestClose={handleCloseAnswerModal}
// // 					contentLabel="Show Answer Transaction"
// // 					style={{
// // 						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
// // 						content: {
// // 							top: "50%",
// // 							left: "50%",
// // 							right: "auto",
// // 							bottom: "auto",
// // 							transform: "translate(-50%, -50%)",
// // 							background: "linear-gradient(to bottom, #1E1E1E, #252526)",
// // 							color: "#D4D4D4",
// // 							borderRadius: "10px",
// // 							padding: "25px",
// // 							width: "600px",
// // 							border: "1px solid #2D2D2D",
// // 							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
// // 						},
// // 					}}
// // 				>
// // 					<div className='flex flex-col items-center'>
// // 						{isProcessing ? (
// // 							<FaSpinner className='text-4xl mb-4 animate-spin' style={{ color: "#A0A0A0" }} />
// // 						) : (
// // 							<FaEthereum className='text-4xl mb-4' style={{ color: "#A0A0A0" }} />
// // 						)}
// // 						<h2 className='text-2xl font-bold mb-4'>MetaMask Transaction</h2>
// // 						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
// // 							{isProcessing && (
// // 								<div className='w-full bg-[#2D2D2D] h-2 rounded-full mb-3 overflow-hidden'>
// // 									<div
// // 										className='bg-[#A0A0A0] h-full rounded-full transition-all duration-500'
// // 										style={{ width: isProcessing ? "70%" : "100%" }}
// // 									></div>
// // 								</div>
// // 							)}
// // 							<div className='flex items-center justify-between mb-3'>
// // 								<p className='text-sm flex items-center'>
// // 									{isProcessing ? (
// // 										<FaSpinner className='mr-2 animate-spin' style={{ color: "#A0A0A0" }} />
// // 									) : (
// // 										<FaCheckCircle className='mr-2' style={{ color: "#A0A0A0" }} />
// // 									)}
// // 									<span className='font-semibold'>Status:</span> {isProcessing ? "Pending" : "Confirmed ✅"}
// // 								</p>
// // 								{!isProcessing && (
// // 									<p className='text-sm' style={{ color: "#A0A0A0" }}>
// // 										Block: {Math.floor(Math.random() * 1000000)}
// // 									</p>
// // 								)}
// // 							</div>
// // 							<p className='text-sm flex items-center mb-2'>
// // 								<FaEthereum className='mr-2' style={{ color: "#A0A0A0" }} />
// // 								<span className='font-semibold'>Amount:</span> -10 ETH
// // 							</p>
// // 							<p className='text-sm mb-2'>
// // 								<span className='font-semibold'>From:</span> {senderAddress.slice(0, 6)}...{senderAddress.slice(-4)}
// // 							</p>
// // 							<p className='text-sm mb-2'>
// // 								<span className='font-semibold'>To:</span> {receiverAddress.slice(0, 6)}...{receiverAddress.slice(-4)}
// // 							</p>
// // 							<p className='text-sm mb-2 flex items-center'>
// // 								<span className='font-semibold'>TX Hash:</span>{" "}
// // 								{isProcessing ? "Processing..." : txHash.slice(0, 6) + "..." + txHash.slice(-4)}
// // 								{!isProcessing && (
// // 									<button
// // 										className='ml-2 text-sm transition-colors'
// // 										onClick={() => copyToClipboard(txHash)}
// // 										onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D4D4")}
// // 										onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
// // 									>
// // 										<FaCopy style={{ color: "#A0A0A0" }} />
// // 									</button>
// // 								)}
// // 							</p>
// // 							<p className='text-sm mb-2'>
// // 								<span className='font-semibold'>Gas Estimate:</span> {isProcessing ? "Calculating..." : "0.001 ETH"}
// // 							</p>
// // 							<p className='text-sm flex items-center'>
// // 								<span className='font-semibold'>New Balance:</span>{" "}
// // 								{balance ? `${balance.toFixed(4)} ETH` : "Loading..."}
// // 							</p>
// // 						</div>
// // 						<button
// // 							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
// // 							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// // 							onClick={handleCloseAnswerModal}
// // 							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// // 							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// // 							disabled={isProcessing}
// // 						>
// // 							{isProcessing ? "Processing..." : "View Solution"}
// // 						</button>
// // 					</div>
// // 				</Modal>

// // 				{/* Solution Modal */}
// // 				<Modal
// // 					isOpen={showSolutionModal}
// // 					onRequestClose={() => setShowSolutionModal(false)}
// // 					contentLabel="Solution Display"
// // 					style={{
// // 						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
// // 						content: {
// // 							top: "50%",
// // 							left: "50%",
// // 							right: "auto",
// // 							bottom: "auto",
// // 							transform: "translate(-50%, -50%)",
// // 							background: "linear-gradient(to bottom, #1E1E1E, #252526)",
// // 							color: "#D4D4D4",
// // 							borderRadius: "10px",
// // 							padding: "25px",
// // 							width: "600px",
// // 							border: "1px solid #2D2D2D",
// // 							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
// // 						},
// // 					}}
// // 				>
// // 					<div className='flex flex-col items-center'>
// // 						<h2 className='text-2xl font-bold mb-4'>Solution: twoSum</h2>
// // 						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
// // 							<CodeMirror
// // 								value={correctAnswer}
// // 								theme={vscodeDark}
// // 								extensions={[javascript()]}
// // 								style={{ fontSize: "14px" }}
// // 								readOnly={true}
// // 							/>
// // 							<div className='flex justify-end mt-2'>
// // 								<button
// // 									className='px-3 py-1 rounded text-sm font-medium transition-colors flex items-center'
// // 									style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// // 									onClick={() => copyToClipboard(correctAnswer)}
// // 									onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// // 									onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// // 								>
// // 									<FaCopy className='mr-1' /> Copy Code
// // 								</button>
// // 								<button
// // 									className='ml-2 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center'
// // 									style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// // 									onClick={() => toast.info("Running code (simulated)", { theme: "dark" })}
// // 									onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// // 									onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// // 								>
// // 									<FaPlay className='mr-1' /> Run Code
// // 								</button>
// // 							</div>
// // 						</div>
// // 						<div className='w-full'>
// // 							<button
// // 								className='w-full text-left px-3 py-2 rounded-t-none rounded-b-lg text-sm font-medium transition-colors flex items-center justify-between'
// // 								style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// // 								onClick={() => setExplanationOpen(!explanationOpen)}
// // 								onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// // 								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// // 							>
// // 								<span>Explanation</span>
// // 								{explanationOpen ? <FaChevronUp /> : <FaChevronDown />}
// // 							</button>
// // 							{explanationOpen && (
// // 								<div className='bg-[#2D2D2D] p-3 rounded-b-lg text-sm' style={{ color: "#A0A0A0" }}>
// // 									This solution uses a hash map to achieve O(n) time complexity by storing previously seen numbers and checking for the complement in each iteration.
// // 								</div>
// // 							)}
// // 						</div>
// // 						<button
// // 							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
// // 							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// // 							onClick={() => setShowSolutionModal(false)}
// // 							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// // 							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// // 						>
// // 							Close
// // 						</button>
// // 					</div>
// // 				</Modal>
// // 			</div>
// // 		</CopilotKit>
// // 	);
// // };

// // export default Playground;

// import { useState, useEffect } from "react";
// import PreferenceNav from "./PreferenceNav/PreferenceNav";
// import Split from "react-split";
// import CodeMirror from "@uiw/react-codemirror";
// import { vscodeDark } from "@uiw/codemirror-theme-vscode";
// import { javascript } from "@codemirror/lang-javascript";
// import EditorFooter from "./EditorFooter";
// import { Problem } from "@/utils/types/problem";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, firestore } from "@/firebase/firebase";
// import { toast } from "react-toastify";
// import { problems } from "@/utils/problems";
// import { useRouter } from "next/router";
// import { arrayUnion, doc, updateDoc } from "firebase/firestore";
// import useLocalStorage from "@/hooks/useLocalStorage";
// import { CopilotKit } from "@copilotkit/react-core";
// import { CopilotSidebar } from "@copilotkit/react-ui";
// import "@copilotkit/react-ui/styles.css";
// import Modal from "react-modal";
// import { ethers } from "ethers";
// import { FaEthereum, FaCheckCircle, FaSpinner, FaCopy, FaPlay, FaChevronDown, FaChevronUp } from "react-icons/fa";

// Modal.setAppElement("#__next");

// type PlaygroundProps = {
// 	problem: Problem;
// 	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
// 	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
// };

// export interface ISettings {
// 	fontSize: string;
// 	settingsModalIsOpen: boolean;
// 	dropdownIsOpen: boolean;
// }

// const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
// 	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
// 	let [userCode, setUserCode] = useState<string>(problem.starterCode);
// 	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
// 	const [showModal, setShowModal] = useState(false);
// 	const [showAnswerModal, setShowAnswerModal] = useState(false);
// 	const [showSolutionModal, setShowSolutionModal] = useState(false);
// 	const [balance, setBalance] = useState<number | null>(null);
// 	const [isProcessing, setIsProcessing] = useState(false);
// 	const [txHash, setTxHash] = useState<string>("");
// 	const [explanationOpen, setExplanationOpen] = useState(false);

// 	const [settings, setSettings] = useState<ISettings>({
// 		fontSize: fontSize,
// 		settingsModalIsOpen: false,
// 		dropdownIsOpen: false,
// 	});

// 	const [user] = useAuthState(auth);
// 	const {
// 		query: { pid },
// 	} = useRouter();

// 	// Ethereum configuration
// 	const senderAddress = "0x191607A8120cE3596a89786B2F095Ef48fcF82CC";
// 	const receiverAddress = "0xfB848B7C5d34E9B17B56E7d6AA9A3427B8AEbbf8";
// 	const amountToSend = ethers.parseEther("10.0");

// 	// Correct answer for twoSum problem
// 	const correctAnswer = `function twoSum(nums, target) {
//   const seen = {};
//   for (let i = 0; i < nums.length; i++) {
//     const complement = target - nums[i];
//     if (seen.hasOwnProperty(complement)) {
//       return [seen[complement], i];
//     }
//     seen[nums[i]] = i;
//   }
// }`;

// 	const handleSubmit = async () => {
// 		if (!user) {
// 			toast.error("Please login to submit your code", {
// 				position: "top-center",
// 				autoClose: 3000,
// 				theme: "dark",
// 			});
// 			return;
// 		}

// 		try {
// 			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
// 			const cb = new Function(`return ${userCode}`)();
// 			const handler = problems[pid as string].handlerFunction;

// 			if (typeof handler === "function") {
// 				const success = handler(cb);
// 				if (success) {
// 					toast.success("Congrats! All tests passed!", {
// 						position: "top-center",
// 						autoClose: 2000,
// 						theme: "dark",
// 					});

// 					// Award 20 ETH on successful submission
// 					const newBalance = balance ? balance + 20 : 20;
// 					setBalance(newBalance);

// 					setTimeout(() => {
// 						toast.info(`💸 +20 ETH Credited to your wallet! New Balance: ${newBalance.toFixed(4)} ETH`, {
// 							position: "top-center",
// 							autoClose: 3000,
// 							theme: "dark",
// 						});
// 					}, 2000);

// 					setTimeout(() => {
// 						setShowModal(true);
// 					}, 3500);

// 					setSuccess(true);
// 					setTimeout(() => setSuccess(false), 4000);

// 					const userRef = doc(firestore, "users", user.uid);
// 					await updateDoc(userRef, {
// 						solvedProblems: arrayUnion(pid),
// 					});
// 					setSolved(true);
// 				}
// 			}
// 		} catch (error: any) {
// 			console.log(error.message);
// 			if (error.message.startsWith("AssertionError")) {
// 				toast.error("Oops! One or more test cases failed", {
// 					position: "top-center",
// 					autoClose: 3000,
// 					theme: "dark",
// 				});
// 			} else {
// 				toast.error(error.message, {
// 					position: "top-center",
// 					autoClose: 3000,
// 					theme: "dark",
// 				});
// 			}
// 		}
// 	};

// 	const handleShowAnswer = async () => {
// 		if (!window.ethereum) {
// 			toast.error("MetaMask is not installed. Please install it to proceed.", {
// 				position: "top-center",
// 				autoClose: 3000,
// 				theme: "dark",
// 			});
// 			return;
// 		}

// 		setIsProcessing(true);

// 		try {
// 			const provider = new ethers.BrowserProvider(window.ethereum);
// 			const signer = await provider.getSigner();
// 			const sender = await signer.getAddress();

// 			if (sender.toLowerCase() !== senderAddress.toLowerCase()) {
// 				toast.error("Please switch to the correct wallet address in MetaMask.", {
// 					position: "top-center",
// 					autoClose: 3000,
// 					theme: "dark",
// 				});
// 				setIsProcessing(false);
// 				return;
// 			}

// 			const tx = await signer.sendTransaction({
// 				to: receiverAddress,
// 				value: amountToSend,
// 			});

// 			setTxHash(tx.hash);
// 			toast.info(`Transaction sent! Hash: ${tx.hash}`, {
// 				position: "top-center",
// 				autoClose: 5000,
// 				theme: "dark",
// 			});

// 			await tx.wait();
// 			const newBalance = await provider.getBalance(sender);
// 			setBalance(Number(ethers.formatEther(newBalance)));

// 			toast.success("Transaction confirmed! -10 ETH deducted.", {
// 				position: "top-center",
// 				autoClose: 3000,
// 				theme: "dark",
// 			});

// 			setShowAnswerModal(true);
// 		} catch (error: any) {
// 			console.error("Transaction failed:", error);
// 			toast.error(`Transaction failed: ${error.message}`, {
// 				position: "top-center",
// 				autoClose: 3000,
// 				theme: "dark",
// 			});
// 		} finally {
// 			setIsProcessing(false);
// 		}
// 	};

// 	const handleCloseAnswerModal = () => {
// 		setShowAnswerModal(false);
// 		setShowSolutionModal(true);
// 	};

// 	const copyToClipboard = (text: string) => {
// 		navigator.clipboard.writeText(text).then(() => {
// 			toast.success("Copied to clipboard!", {
// 				position: "top-center",
// 				autoClose: 2000,
// 				theme: "dark",
// 			});
// 		});
// 	};

// 	useEffect(() => {
// 		const code = localStorage.getItem(`code-${pid}`);
// 		if (user) {
// 			setUserCode(code ? JSON.parse(code) : problem.starterCode);
// 		} else {
// 			setUserCode(problem.starterCode);
// 		}

// 		if (window.ethereum) {
// 			const provider = new ethers.BrowserProvider(window.ethereum);
// 			provider.getBalance(senderAddress).then((balance) => {
// 				setBalance(Number(ethers.formatEther(balance)));
// 			});
// 		}
// 	}, [pid, user, problem.starterCode]);

// 	const onChange = (value: string) => {
// 		setUserCode(value);
// 		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
// 	};

// 	return (
// 		<CopilotKit publicApiKey="ck_pub_383e95912191e43428b4edbd6aabba68">
// 			<div className='flex flex-row bg-dark-layer-1 h-screen'>
// 				<div className='flex flex-col flex-1 relative overflow-x-hidden'>
// 					<PreferenceNav settings={settings} setSettings={setSettings} />

// 					<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
// 						<div className='w-full overflow-auto'>
// 							<CodeMirror
// 								value={userCode}
// 								theme={vscodeDark}
// 								onChange={onChange}
// 								extensions={[javascript()]}
// 								style={{ fontSize: settings.fontSize }}
// 							/>
// 						</div>
// 						<div className='w-full px-5 overflow-auto'>
// 							<div className='flex h-10 items-center space-x-6'>
// 								<div className='relative flex h-full flex-col justify-center cursor-pointer'>
// 									<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
// 									<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
// 								</div>
// 								<button className='text-sm font-medium leading-5 text-white'>
// 									Show balance: {balance ? `${balance.toFixed(4)} ETH` : "Loading..."}
// 								</button>
// 								<button
// 									className='text-sm font-medium leading-5 text-white'
// 									onClick={handleShowAnswer}
// 									disabled={isProcessing}
// 								>
// 									{isProcessing ? "Processing..." : "Show answer: -10 ETH"}
// 								</button>
// 							</div>

// 							<div className='flex'>
// 								{problem.examples.map((example, index) => (
// 									<div
// 										className='mr-2 items-start mt-2'
// 										key={example.id}
// 										onClick={() => setActiveTestCaseId(index)}
// 									>
// 										<div className='flex flex-wrap items-center gap-y-4'>
// 											<div
// 												className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
//                         ${activeTestCaseId === index ? "text-white" : "text-gray-500"}`}
// 											>
// 												Case {index + 1}
// 											</div>
// 										</div>
// 									</div>
// 								))}
// 							</div>

// 							<div className='font-semibold my-4'>
// 								<p className='text-sm font-medium mt-4 text-white'>Input:</p>
// 								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
// 									{problem.examples[activeTestCaseId].inputText}
// 								</div>
// 								<p className='text-sm font-medium mt-4 text-white'>Output:</p>
// 								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
// 									{problem.examples[activeTestCaseId].outputText}
// 								</div>
// 							</div>
// 						</div>
// 					</Split>

// 					<EditorFooter handleSubmit={handleSubmit} />
// 				</div>

// 				<CopilotSidebar
// 					className='w-[1450px]'
// 					labels={{
// 						title: "LeetBot",
// 						initial: "Need help with the code or understanding the problem - LeetBot is here!!!",
// 					}}
// 					instructions={`You are an AI assistant helping solve the "${problem.title}" problem or to explain "${problem.problemStatement}" or to complete the code "${problem.starterCode}". Offer code hints, logic explanation, or debugging help.`}
// 				/>

// 				{/* Success Modal */}
// 				<Modal
// 					isOpen={showModal}
// 					onRequestClose={() => setShowModal(false)}
// 					contentLabel="Transaction Simulation"
// 					style={{
// 						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
// 						content: {
// 							top: "50%",
// 							left: "50%",
// 							right: "auto",
// 							bottom: "auto",
// 							transform: "translate(-50%, -50%)",
// 							background: "linear-gradient(to bottom, #1E1E1E, #252526)",
// 							color: "#D4D4D4",
// 							borderRadius: "10px",
// 							padding: "25px",
// 							width: "600px",
// 							border: "1px solid #2D2D2D",
// 							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
// 						},
// 					}}
// 				>
// 					<div className='flex flex-col items-center'>
// 						<FaEthereum className='text-4xl mb-4' style={{ color: "#A0A0A0" }} />
// 						<h2 className='text-2xl font-bold mb-4'>Transaction Confirmed</h2>
// 						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
// 							<div className='flex items-center justify-between mb-3'>
// 								<p className='text-sm flex items-center'>
// 									<FaCheckCircle className='mr-2' style={{ color: "#A0A0A0" }} />
// 									<span className='font-semibold'>Status:</span> Confirmed ✅
// 								</p>
// 								<p className='text-sm' style={{ color: "#A0A0A0" }}>
// 									Timestamp: {new Date().toLocaleString()}
// 								</p>
// 							</div>
// 							<p className='text-sm flex items-center mb-2'>
// 								<FaEthereum className='mr-2' style={{ color: "#A0A0A0" }} />
// 								<span className='font-semibold'>Amount:</span> +20 ETH
// 							</p>
// 							<p className='text-sm mb-2'>
// 								<span className='font-semibold'>TX Hash:</span> 0x{Math.random().toString(16).substring(2, 10)}
// 							</p>
// 							<p className='text-sm mb-2'>
// 								<span className='font-semibold'>New Balance:</span> {balance ? `${balance.toFixed(4)} ETH` : "Loading..."}
// 							</p>
// 							<button
// 								className='mt-2 px-3 py-1 rounded text-sm font-medium transition-colors'
// 								style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// 								onClick={() => window.open("https://fakeexplorer.com/tx/" + Math.random().toString(16).substring(2, 10), "_blank")}
// 								onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// 								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// 							>
// 								View Details
// 							</button>
// 						</div>
// 						<button
// 							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
// 							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// 							onClick={() => setShowModal(false)}
// 							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// 							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// 						>
// 							Close
// 						</button>
// 					</div>
// 				</Modal>

// 				{/* Show Answer Transaction Modal */}
// 				<Modal
// 					isOpen={showAnswerModal}
// 					onRequestClose={handleCloseAnswerModal}
// 					contentLabel="Show Answer Transaction"
// 					style={{
// 						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
// 						content: {
// 							top: "50%",
// 							left: "50%",
// 							right: "auto",
// 							bottom: "auto",
// 							transform: "translate(-50%, -50%)",
// 							background: "linear-gradient(to bottom, #1E1E1E, #252526)",
// 							color: "#D4D4D4",
// 							borderRadius: "10px",
// 							padding: "25px",
// 							width: "600px",
// 							border: "1px solid #2D2D2D",
// 							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
// 						},
// 					}}
// 				>
// 					<div className='flex flex-col items-center'>
// 						{isProcessing ? (
// 							<FaSpinner className='text-4xl mb-4 animate-spin' style={{ color: "#A0A0A0" }} />
// 						) : (
// 							<FaEthereum className='text-4xl mb-4' style={{ color: "#A0A0A0" }} />
// 						)}
// 						<h2 className='text-2xl font-bold mb-4'>MetaMask Transaction</h2>
// 						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
// 							{isProcessing && (
// 								<div className='w-full bg-[#2D2D2D] h-2 rounded-full mb-3 overflow-hidden'>
// 									<div
// 										className='bg-[#A0A0A0] h-full rounded-full transition-all duration-500'
// 										style={{ width: isProcessing ? "70%" : "100%" }}
// 									></div>
// 								</div>
// 							)}
// 							<div className='flex items-center justify-between mb-3'>
// 								<p className='text-sm flex items-center'>
// 									{isProcessing ? (
// 										<FaSpinner className='mr-2 animate-spin' style={{ color: "#A0A0A0" }} />
// 									) : (
// 										<FaCheckCircle className='mr-2' style={{ color: "#A0A0A0" }} />
// 									)}
// 									<span className='font-semibold'>Status:</span> {isProcessing ? "Pending" : "Confirmed ✅"}
// 								</p>
// 								{!isProcessing && (
// 									<p className='text-sm' style={{ color: "#A0A0A0" }}>
// 										Block: {Math.floor(Math.random() * 1000000)}
// 									</p>
// 								)}
// 							</div>
// 							<p className='text-sm flex items-center mb-2'>
// 								<FaEthereum className='mr-2' style={{ color: "#A0A0A0" }} />
// 								<span className='font-semibold'>Amount:</span> -10 ETH
// 							</p>
// 							<p className='text-sm mb-2'>
// 								<span className='font-semibold'>From:</span> {senderAddress.slice(0, 6)}...{senderAddress.slice(-4)}
// 							</p>
// 							<p className='text-sm mb-2'>
// 								<span className='font-semibold'>To:</span> {receiverAddress.slice(0, 6)}...{receiverAddress.slice(-4)}
// 							</p>
// 							<p className='text-sm mb-2 flex items-center'>
// 								<span className='font-semibold'>TX Hash:</span>{" "}
// 								{isProcessing ? "Processing..." : txHash.slice(0, 6) + "..." + txHash.slice(-4)}
// 								{!isProcessing && (
// 									<button
// 										className='ml-2 text-sm transition-colors'
// 										onClick={() => copyToClipboard(txHash)}
// 										onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D4D4")}
// 										onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
// 									>
// 										<FaCopy style={{ color: "#A0A0A0" }} />
// 									</button>
// 								)}
// 							</p>
// 							<p className='text-sm mb-2'>
// 								<span className='font-semibold'>Gas Estimate:</span> {isProcessing ? "Calculating..." : "0.001 ETH"}
// 							</p>
// 							<p className='text-sm flex items-center'>
// 								<span className='font-semibold'>New Balance:</span>{" "}
// 								{balance ? `${balance.toFixed(4)} ETH` : "Loading..."}
// 							</p>
// 						</div>
// 						<button
// 							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
// 							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// 							onClick={handleCloseAnswerModal}
// 							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// 							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// 							disabled={isProcessing}
// 						>
// 							{isProcessing ? "Processing..." : "View Solution"}
// 						</button>
// 					</div>
// 				</Modal>

// 				{/* Solution Modal */}
// 				<Modal
// 					isOpen={showSolutionModal}
// 					onRequestClose={() => setShowSolutionModal(false)}
// 					contentLabel="Solution Display"
// 					style={{
// 						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
// 						content: {
// 							top: "50%",
// 							left: "50%",
// 							right: "auto",
// 							bottom: "auto",
// 							transform: "translate(-50%, -50%)",
// 							background: "linear-gradient(to bottom, #1E1E1E, #252526)",
// 							color: "#D4D4D4",
// 							borderRadius: "10px",
// 							padding: "25px",
// 							width: "600px",
// 							border: "1px solid #2D2D2D",
// 							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
// 						},
// 					}}
// 				>
// 					<div className='flex flex-col items-center'>
// 						<h2 className='text-2xl font-bold mb-4'>Solution: twoSum</h2>
// 						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
// 							<CodeMirror
// 								value={correctAnswer}
// 								theme={vscodeDark}
// 								extensions={[javascript()]}
// 								style={{ fontSize: "14px" }}
// 								readOnly={true}
// 							/>
// 							<div className='flex justify-end mt-2'>
// 								<button
// 									className='px-3 py-1 rounded text-sm font-medium transition-colors flex items-center'
// 									style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// 									onClick={() => copyToClipboard(correctAnswer)}
// 									onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// 									onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// 								>
// 									<FaCopy className='mr-1' /> Copy Code
// 								</button>
// 								<button
// 									className='ml-2 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center'
// 									style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// 									onClick={() => toast.info("Running code (simulated)", { theme: "dark" })}
// 									onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// 									onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// 								>
// 									<FaPlay className='mr-1' /> Run Code
// 								</button>
// 							</div>
// 						</div>
// 						<div className='w-full'>
// 							<button
// 								className='w-full text-left px-3 py-2 rounded-t-none rounded-b-lg text-sm font-medium transition-colors flex items-center justify-between'
// 								style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// 								onClick={() => setExplanationOpen(!explanationOpen)}
// 								onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// 								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// 							>
// 								<span>Explanation</span>
// 								{explanationOpen ? <FaChevronUp /> : <FaChevronDown />}
// 							</button>
// 							{explanationOpen && (
// 								<div className='bg-[#2D2D2D] p-3 rounded-b-lg text-sm' style={{ color: "#A0A0A0" }}>
// 									This solution uses a hash map to achieve O(n) time complexity by storing previously seen numbers and checking for the complement in each iteration.
// 								</div>
// 							)}
// 						</div>
// 						<button
// 							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
// 							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
// 							onClick={() => setShowSolutionModal(false)}
// 							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
// 							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
// 						>
// 							Close
// 						</button>
// 					</div>
// 				</Modal>
// 			</div>
// 		</CopilotKit>
// 	);
// };

// export default Playground;

import { useState, useEffect } from "react";
import PreferenceNav from "./PreferenceNav/PreferenceNav";
import Split from "react-split";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter";
import { Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotSidebar } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import Modal from "react-modal";
import { ethers } from "ethers";
import { FaEthereum, FaCheckCircle, FaSpinner, FaCopy, FaPlay, FaChevronDown, FaChevronUp } from "react-icons/fa";

Modal.setAppElement("#__next");

type PlaygroundProps = {
	problem: Problem;
	setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
	setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
	fontSize: string;
	settingsModalIsOpen: boolean;
	dropdownIsOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({ problem, setSuccess, setSolved }) => {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCode);
	const [fontSize, setFontSize] = useLocalStorage("lcc-fontSize", "16px");
	const [showModal, setShowModal] = useState(false);
	const [showAnswerModal, setShowAnswerModal] = useState(false);
	const [showSolutionModal, setShowSolutionModal] = useState(false);
	const [balance, setBalance] = useState<number | null>(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [txHash, setTxHash] = useState<string>("");
	const [submitTxHash, setSubmitTxHash] = useState<string>(""); // Track TX hash for submit
	const [explanationOpen, setExplanationOpen] = useState(false);

	const [settings, setSettings] = useState<ISettings>({
		fontSize: fontSize,
		settingsModalIsOpen: false,
		dropdownIsOpen: false,
	});

	const [user] = useAuthState(auth);
	const {
		query: { pid },
	} = useRouter();

	// Ethereum configuration
	const senderAddress = "0x191607A8120cE3596a89786B2F095Ef48fcF82CC";
	const receiverAddress = "0xfB848B7C5d34E9B17B56E7d6AA9A3427B8AEbbf8";
	const amountToSend = ethers.parseEther("10.0"); // For "Show Answer"
	const amountToTransferOnSubmit = ethers.parseEther("20.0"); // For "Submit"

	// Correct answer for twoSum problem
	const correctAnswer = `function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.hasOwnProperty(complement)) {
      return [seen[complement], i];
    }
    seen[nums[i]] = i;
  }
}`;

	const handleSubmit = async () => {
		if (!user) {
			toast.error("Please login to submit your code", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}

		try {
			userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					toast.success("Congrats! All tests passed!", {
						position: "top-center",
						autoClose: 2000,
						theme: "dark",
					});

					// Automatic 20 ETH transfer
					if (window.ethereum) {
						const provider = new ethers.BrowserProvider(window.ethereum);
						const signer = await provider.getSigner();
						const sender = await signer.getAddress();

						if (sender.toLowerCase() !== senderAddress.toLowerCase()) {
							toast.error("Please switch to the correct wallet address in MetaMask.", {
								position: "top-center",
								autoClose: 3000,
								theme: "dark",
							});
							return;
						}

						// Simulate automatic transaction (no confirmation)
						const tx = await signer.sendTransaction({
							to: receiverAddress,
							value: amountToTransferOnSubmit,
						});

						setSubmitTxHash(tx.hash);
						toast.info(`Transaction sent! Hash: ${tx.hash}`, {
							position: "top-center",
							autoClose: 5000,
							theme: "dark",
						});

						await tx.wait();
						const newBalance = await provider.getBalance(sender);
						setBalance(Number(ethers.formatEther(newBalance)));

						toast.success("Transaction confirmed! -20 ETH deducted.", {
							position: "top-center",
							autoClose: 3000,
							theme: "dark",
						});
					} else {
						toast.error("MetaMask is not installed. Transaction skipped.", {
							position: "top-center",
							autoClose: 3000,
							theme: "dark",
						});
					}

					setTimeout(() => {
						setShowModal(true);
					}, 2000);

					setSuccess(true);
					setTimeout(() => setSuccess(false), 4000);

					const userRef = doc(firestore, "users", user.uid);
					await updateDoc(userRef, {
						solvedProblems: arrayUnion(pid),
					});
					setSolved(true);
				}
			}
		} catch (error: any) {
			console.log(error.message);
			if (error.message.startsWith("AssertionError")) {
				toast.error("Oops! One or more test cases failed", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			} else {
				toast.error(error.message, {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
			}
		}
	};

	const handleShowAnswer = async () => {
		if (!window.ethereum) {
			toast.error("MetaMask is not installed. Please install it to proceed.", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
			return;
		}

		setIsProcessing(true);

		try {
			const provider = new ethers.BrowserProvider(window.ethereum);
			const signer = await provider.getSigner();
			const sender = await signer.getAddress();

			if (sender.toLowerCase() !== senderAddress.toLowerCase()) {
				toast.error("Please switch to the correct wallet address in MetaMask.", {
					position: "top-center",
					autoClose: 3000,
					theme: "dark",
				});
				setIsProcessing(false);
				return;
			}

			const tx = await signer.sendTransaction({
				to: receiverAddress,
				value: amountToSend,
			});

			setTxHash(tx.hash);
			toast.info(`Transaction sent! Hash: ${tx.hash}`, {
				position: "top-center",
				autoClose: 5000,
				theme: "dark",
			});

			await tx.wait();
			const newBalance = await provider.getBalance(sender);
			setBalance(Number(ethers.formatEther(newBalance)));

			toast.success("Transaction confirmed! -10 ETH deducted.", {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});

			setShowAnswerModal(true);
		} catch (error: any) {
			console.error("Transaction failed:", error);
			toast.error(`Transaction failed: ${error.message}`, {
				position: "top-center",
				autoClose: 3000,
				theme: "dark",
			});
		} finally {
			setIsProcessing(false);
		}
	};

	const handleCloseAnswerModal = () => {
		setShowAnswerModal(false);
		setShowSolutionModal(true);
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			toast.success("Copied to clipboard!", {
				position: "top-center",
				autoClose: 2000,
				theme: "dark",
			});
		});
	};

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		if (user) {
			setUserCode(code ? JSON.parse(code) : problem.starterCode);
		} else {
			setUserCode(problem.starterCode);
		}

		if (window.ethereum) {
			const provider = new ethers.BrowserProvider(window.ethereum);
			provider.getBalance(senderAddress).then((balance) => {
				setBalance(Number(ethers.formatEther(balance)));
			});
		}
	}, [pid, user, problem.starterCode]);

	const onChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<CopilotKit publicApiKey="ck_pub_383e95912191e43428b4edbd6aabba68">
			<div className='flex flex-row bg-dark-layer-1 h-screen'>
				<div className='flex flex-col flex-1 relative overflow-x-hidden'>
					<PreferenceNav settings={settings} setSettings={setSettings} />

					<Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60, 40]} minSize={60}>
						<div className='w-full overflow-auto'>
							<CodeMirror
								value={userCode}
								theme={vscodeDark}
								onChange={onChange}
								extensions={[javascript()]}
								style={{ fontSize: settings.fontSize }}
							/>
						</div>
						<div className='w-full px-5 overflow-auto'>
							<div className='flex h-10 items-center space-x-6'>
								<div className='relative flex h-full flex-col justify-center cursor-pointer'>
									<div className='text-sm font-medium leading-5 text-white'>Testcases</div>
									<hr className='absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white' />
								</div>
								<button
									className='text-sm font-medium leading-5 text-white'
									onClick={handleShowAnswer}
									disabled={isProcessing}
								>
									{isProcessing ? "Processing..." : "Show answer: -10 ETH"}
								</button>
							</div>

							<div className='flex'>
								{problem.examples.map((example, index) => (
									<div
										className='mr-2 items-start mt-2'
										key={example.id}
										onClick={() => setActiveTestCaseId(index)}
									>
										<div className='flex flex-wrap items-center gap-y-4'>
											<div
												className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                        ${activeTestCaseId === index ? "text-white" : "text-gray-500"}`}
											>
												Case {index + 1}
											</div>
										</div>
									</div>
								))}
							</div>

							<div className='font-semibold my-4'>
								<p className='text-sm font-medium mt-4 text-white'>Input:</p>
								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
									{problem.examples[activeTestCaseId].inputText}
								</div>
								<p className='text-sm font-medium mt-4 text-white'>Output:</p>
								<div className='w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2'>
									{problem.examples[activeTestCaseId].outputText}
								</div>
							</div>
						</div>
					</Split>

					<EditorFooter handleSubmit={handleSubmit} />
				</div>

				<CopilotSidebar
					className='w-[1450px]'
					labels={{
						title: "LeetBot",
						initial: "Need help with the code or understanding the problem - LeetBot is here!!!",
					}}
					instructions={`You are an AI assistant helping solve the "${problem.title}" problem or to explain "${problem.problemStatement}" or to complete the code "${problem.starterCode}". Offer code hints, logic explanation, or debugging help.`}
				/>

				{/* Success Modal */}
				<Modal
					isOpen={showModal}
					onRequestClose={() => setShowModal(false)}
					contentLabel="Transaction Simulation"
					style={{
						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
						content: {
							top: "50%",
							left: "50%",
							right: "auto",
							bottom: "auto",
							transform: "translate(-50%, -50%)",
							background: "linear-gradient(to bottom, #1E1E1E, #252526)", // VS Code Dark gradient
							color: "#D4D4D4", // Light Gray
							borderRadius: "10px",
							padding: "25px",
							width: "600px",
							border: "1px solid #2D2D2D",
							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
						},
					}}
				>
					<div className='flex flex-col items-center'>
						<FaEthereum className='text-4xl mb-4' style={{ color: "#A0A0A0" }} /> {/* Medium Gray */}
						<h2 className='text-2xl font-bold mb-4'>Submission Successful</h2>
						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
							<div className='flex items-center justify-between mb-3'>
								<p className='text-sm flex items-center'>
									<FaCheckCircle className='mr-2' style={{ color: "#A0A0A0" }} /> {/* Medium Gray */}
									<span className='font-semibold'>Status:</span> Confirmed ✅
								</p>
								<p className='text-sm' style={{ color: "#A0A0A0" }}>
									Timestamp: {new Date().toLocaleString()}
								</p>
							</div>
							<p className='text-sm flex items-center mb-2'>
								<FaEthereum className='mr-2' style={{ color: "#A0A0A0" }} />
								<span className='font-semibold'>Amount:</span> -20 ETH
							</p>
							<p className='text-sm mb-2 flex items-center'>
								<span className='font-semibold'>TX Hash:</span>{" "}
								{submitTxHash ? submitTxHash.slice(0, 6) + "..." + submitTxHash.slice(-4) : "N/A"}
								{submitTxHash && (
									<button
										className='ml-2 text-sm transition-colors'
										onClick={() => copyToClipboard(submitTxHash)}
										onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D4D4")}
										onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
									>
										<FaCopy style={{ color: "#A0A0A0" }} />
									</button>
								)}
							</p>
							<p className='text-sm mb-2'>
								<span className='font-semibold'>New Balance:</span>{" "}
								{balance ? `${balance.toFixed(4)} ETH` : "Loading..."}
							</p>
							<button
								className='mt-2 px-3 py-1 rounded text-sm font-medium transition-colors'
								style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
								onClick={() => window.open("https://fakeexplorer.com/tx/" + (submitTxHash || "N/A"), "_blank")}
								onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
							>
								View Details
							</button>
						</div>
						<button
							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
							onClick={() => setShowModal(false)}
							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
						>
							Close
						</button>
					</div>
				</Modal>

				{/* Show Answer Transaction Modal */}
				<Modal
					isOpen={showAnswerModal}
					onRequestClose={handleCloseAnswerModal}
					contentLabel="Show Answer Transaction"
					style={{
						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
						content: {
							top: "50%",
							left: "50%",
							right: "auto",
							bottom: "auto",
							transform: "translate(-50%, -50%)",
							background: "linear-gradient(to bottom, #1E1E1E, #252526)", // VS Code Dark gradient
							color: "#D4D4D4", // Light Gray
							borderRadius: "10px",
							padding: "25px",
							width: "600px",
							border: "1px solid #2D2D2D",
							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
						},
					}}
				>
					<div className='flex flex-col items-center'>
						{isProcessing ? (
							<FaSpinner className='text-4xl mb-4 animate-spin' style={{ color: "#A0A0A0" }} /> 
						) : (
						<FaEthereum className='text-4xl mb-4' style={{ color: "#A0A0A0" }} /> 
						)}
						<h2 className='text-2xl font-bold mb-4'>MetaMask Transaction</h2>
						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
							{isProcessing && (
								<div className='w-full bg-[#2D2D2D] h-2 rounded-full mb-3 overflow-hidden'>
									<div
										className='bg-[#A0A0A0] h-full rounded-full transition-all duration-500'
										style={{ width: isProcessing ? "70%" : "100%" }}
									></div>
								</div>
							)}
							<div className='flex items-center justify-between mb-3'>
								<p className='text-sm flex items-center'>
									{isProcessing ? (
										<FaSpinner className='mr-2 animate-spin' style={{ color: "#A0A0A0" }} />
									) : (
										<FaCheckCircle className='mr-2' style={{ color: "#A0A0A0" }} />
									)}
									<span className='font-semibold'>Status:</span> {isProcessing ? "Pending" : "Confirmed ✅"}
								</p>
								{!isProcessing && (
									<p className='text-sm' style={{ color: "#A0A0A0" }}>
										Block: {Math.floor(Math.random() * 1000000)}
									</p>
								)}
							</div>
							<p className='text-sm flex items-center mb-2'>
								<FaEthereum className='mr-2' style={{ color: "#A0A0A0" }} />
								<span className='font-semibold'>Amount:</span> -10 ETH
							</p>
							<p className='text-sm mb-2'>
								<span className='font-semibold'>From:</span> {senderAddress.slice(0, 6)}...{senderAddress.slice(-4)}
							</p>
							<p className='text-sm mb-2'>
								<span className='font-semibold'>To:</span> {receiverAddress.slice(0, 6)}...{receiverAddress.slice(-4)}
							</p>
							<p className='text-sm mb-2 flex items-center'>
								<span className='font-semibold'>TX Hash:</span>{" "}
								{isProcessing ? "Processing..." : txHash.slice(0, 6) + "..." + txHash.slice(-4)}
								{!isProcessing && (
									<button
										className='ml-2 text-sm transition-colors'
										onClick={() => copyToClipboard(txHash)}
										onMouseEnter={(e) => (e.currentTarget.style.color = "#D4D4D4")}
										onMouseLeave={(e) => (e.currentTarget.style.color = "#A0A0A0")}
									>
										<FaCopy style={{ color: "#A0A0A0" }} />
									</button>
								)}
							</p>
							<p className='text-sm mb-2'>
								<span className='font-semibold'>Gas Estimate:</span> {isProcessing ? "Calculating..." : "0.001 ETH"}
							</p>
							<p className='text-sm flex items-center'>
								<span className='font-semibold'>New Balance:</span>{" "}
								{balance ? `${(balance - 10).toFixed(4)} ETH` : "Loading..."}
							</p>
						</div>
						<button
							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
							onClick={handleCloseAnswerModal}
							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
							disabled={isProcessing}
						>
							{isProcessing ? "Processing..." : "View Solution"}
						</button>
					</div>
				</Modal>

				{/* Solution Modal */}
				<Modal
					isOpen={showSolutionModal}
					onRequestClose={() => setShowSolutionModal(false)}
					contentLabel="Solution Display"
					style={{
						overlay: { backgroundColor: "rgba(0, 0, 0, 0.85)" },
						content: {
							top: "50%",
							left: "50%",
							right: "auto",
							bottom: "auto",
							transform: "translate(-50%, -50%)",
							background: "linear-gradient(to bottom, #1E1E1E, #252526)", // VS Code Dark gradient
							color: "#D4D4D4", // Light Gray
							borderRadius: "10px",
							padding: "25px",
							width: "600px",
							border: "1px solid #2D2D2D",
							boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
						},
					}}
				>
					<div className='flex flex-col items-center'>
						<h2 className='text-2xl font-bold mb-4'>Solution: twoSum</h2>
						<div className='w-full bg-[#252526] rounded-lg p-5 mb-4'>
							<CodeMirror
								value={correctAnswer}
								theme={vscodeDark}
								extensions={[javascript()]}
								style={{ fontSize: "14px" }}
								readOnly={true}
							/>
							<div className='flex justify-end mt-2'>
								<button
									className='px-3 py-1 rounded text-sm font-medium transition-colors flex items-center'
									style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
									onClick={() => copyToClipboard(correctAnswer)}
									onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
									onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
								>
									<FaCopy className='mr-1' /> Copy Code
								</button>
								<button
									className='ml-2 px-3 py-1 rounded text-sm font-medium transition-colors flex items-center'
									style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
									onClick={() => toast.info("Running code (simulated)", { theme: "dark" })}
									onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
									onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
								>
									<FaPlay className='mr-1' /> Run Code
								</button>
							</div>
						</div>
						<div className='w-full'>
							<button
								className='w-full text-left px-3 py-2 rounded-t-none rounded-b-lg text-sm font-medium transition-colors flex items-center justify-between'
								style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
								onClick={() => setExplanationOpen(!explanationOpen)}
								onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
								onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
							>
								<span>Explanation</span>
								{explanationOpen ? <FaChevronUp /> : <FaChevronDown />}
							</button>
							{explanationOpen && (
								<div className='bg-[#2D2D2D] p-3 rounded-b-lg text-sm' style={{ color: "#A0A0A0" }}>
									This solution uses a hash map to achieve O(n) time complexity by storing previously seen numbers and checking for the complement in each iteration.
								</div>
							)}
						</div>
						<button
							className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
							style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
							onClick={() => setShowSolutionModal(false)}
							onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
							onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
						>
							Close
						</button>
					</div>
				</Modal>
			</div>
		</CopilotKit>
	);
};

export default Playground;