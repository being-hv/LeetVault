// import React, { useState } from "react";

// type rewardPoolProps = {};

// const rewardPool: React.FC<rewardPoolProps> = () => {
//     const [ethBalance, setEthBalance] = useState(999.98);
//     const [tokensUsed, setTokensUsed] = useState(0);

//     const updateEthBalance = () => {
//         setEthBalance((prev) => parseFloat((prev + 0.05).toFixed(2)));
//     };

//     const showPopup = () => {
//         alert(
//             `Tokens used: \n10 tokens for viewing answers\n20 tokens for correct answers.`
//         );
//         setTokensUsed((prev) => prev + 10);
//     };

//     return (
//         <div
//             style={{
//                 fontFamily: "Arial, sans-serif",
//                 background: "linear-gradient(135deg, #000000, #ff8c00)",
//                 height: "100vh",
//                 overflow: "hidden",
//                 color: "white",
//                 margin: 0,
//             }}
//         >
//             <div
//                 style={{
//                     position: "absolute",
//                     bottom: "20px",
//                     left: "50%",
//                     transform: "translateX(-50%)",
//                     fontSize: "4rem",
//                     fontFamily: "Cursive, sans-serif",
//                     fontWeight: "bold",
//                     textTransform: "uppercase",
//                     letterSpacing: "2px",
//                     color: "#000000",
//                     textShadow: "0 0 10px #ff8c00, 0 0 20px #ff4500",
//                 }}
//             >
//                 RewardVault
//             </div>

//             <button
//                 style={{
//                     position: "absolute",
//                     top: "40px",
//                     right: "40px",
//                     padding: "12px 25px",
//                     backgroundColor: "#ff4500",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "8px",
//                     fontWeight: "bold",
//                     fontSize: "1rem",
//                     cursor: "pointer",
//                     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//                 }}
//                 onClick={updateEthBalance}
//             >
//                 {ethBalance.toFixed(2)} ETH
//             </button>

//             <div
//                 style={{
//                     position: "absolute",
//                     top: "50%",
//                     left: "50%",
//                     width: "400px",
//                     height: "400px",
//                     borderRadius: "50%",
//                     background: "black",
//                     overflow: "hidden",
//                     transform: "translate(-50%, -50%)",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     color: "white",
//                     textAlign: "center",
//                     fontSize: "1.5rem",
//                     boxShadow: "0 0 30px #ff8c00, 0 0 60px #ff4500",
//                     border: "10px solid transparent",
//                     backgroundImage: "radial-gradient(circle, #ff8c00, #ff4500)",
//                     backgroundOrigin: "border-box",
//                     backgroundClip: "content-box",
//                 }}
//             >
//                 <div style={{ zIndex: 2 }}>{ethBalance.toFixed(2)} ETH</div>
//                 <div
//                     style={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         width: "200%",
//                         height: "60%",
//                         background:
//                             "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 200 20\"%3E%3Cpath d=\"M0,15 C20,5 40,-5 60,15 C80,35 100,30 120,15 C140,0 160,-5 180,15 C200,35 220,30 240,15 L240,20 L0,20 Z\" fill=\"%23ff8c00\" /%3E%3C/svg%3E')",
//                         animation: "waveMove 5s linear infinite, waveHeight 2s ease-in-out infinite",
//                         backgroundSize: "100% 100%",
//                     }}
//                 ></div>
//             </div>

//             <div
//                 style={{
//                     position: "absolute",
//                     top: "50%",
//                     right: "30px",
//                     transform: "translateY(-50%)",
//                     display: "flex",
//                     flexDirection: "column",
//                     gap: "15px",
//                 }}
//             >
//                 <button
//                     style={{
//                         padding: "12px 25px",
//                         backgroundColor: "#ff4500",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "8px",
//                         fontWeight: "bold",
//                         fontSize: "1rem",
//                         cursor: "pointer",
//                         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//                         transition: "background-color 0.3s",
//                     }}
//                     onClick={() => alert("Your balance is updated in MetaMask")}
//                 >
//                     YOUR BALANCE
//                 </button>
//                 <button
//                     style={{
//                         padding: "12px 25px",
//                         backgroundColor: "#ff4500",
//                         color: "white",
//                         border: "none",
//                         borderRadius: "8px",
//                         fontWeight: "bold",
//                         fontSize: "1rem",
//                         cursor: "pointer",
//                         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//                         transition: "background-color 0.3s",
//                     }}
//                     onClick={showPopup}
//                 >
//                     TOKENS USED: {tokensUsed}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default rewardPool;

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Modal from "react-modal";
import { FaEthereum, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

Modal.setAppElement("#__next");

type RewardPoolProps = {};

const RewardPool: React.FC<RewardPoolProps> = () => {
    const [ethBalance, setEthBalance] = useState<number | null>(null);
    const [tokensUsed, setTokensUsed] = useState<number>(0);
    const [showTokensModal, setShowTokensModal] = useState(false);

    // Ethereum configuration
    const senderAddress = "0x191607A8120cE3596a89786B2F095Ef48fcF82CC";

    // Fetch ETH balance from MetaMask
    useEffect(() => {
        const fetchBalance = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const balance = await provider.getBalance(senderAddress);
                    setEthBalance(Number(ethers.formatEther(balance)));
                } catch (error) {
                    console.error("Error fetching balance:", error);
                    setEthBalance(1000); // Fallback balance
                    toast.error("Failed to fetch ETH balance. Using fallback value.", {
                        position: "top-center",
                        autoClose: 3000,
                        theme: "dark",
                    });
                }
            } else {
                setEthBalance(1000); // Fallback balance if MetaMask is not available
                toast.warn("MetaMask not detected. Using fallback balance.", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        };

        fetchBalance();
    }, []);

    const updateEthBalance = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const balance = await provider.getBalance(senderAddress);
                setEthBalance(Number(ethers.formatEther(balance)));
                toast.success("ETH balance updated!", {
                    position: "top-center",
                    autoClose: 2000,
                    theme: "dark",
                });
            } catch (error) {
                console.error("Error updating balance:", error);
                toast.error("Failed to update ETH balance.", {
                    position: "top-center",
                    autoClose: 3000,
                    theme: "dark",
                });
            }
        }
    };

    const showTokensPopup = () => {
        setTokensUsed((prev) => prev + 10); // Simulate token usage (e.g., viewing answers)
        setShowTokensModal(true);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            toast.success("Wallet address copied to clipboard!", {
                position: "top-center",
                autoClose: 2000,
                theme: "dark",
            });
        });
    };

    return (
        <div
            style={{
                fontFamily: "Roboto, Arial, sans-serif",
                background: "linear-gradient(135deg, #1E1E1E, #252526)", // VS Code Dark gradient
                height: "100vh",
                overflow: "hidden",
                color: "#D4D4D4", // Light Gray
                margin: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            {/* Header Title */}
            <div
                style={{
                    position: "absolute",
                    top: "20px",
                    fontSize: "3rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#D4D4D4",
                    textShadow: "0 0 10px rgba(160, 160, 160, 0.5)", // Subtle Medium Gray glow
                }}
            >
                RewardVault
            </div>

            {/* ETH Balance Button */}
            <button
                style={{
                    position: "absolute",
                    top: "40px",
                    right: "40px",
                    padding: "12px 25px",
                    backgroundColor: "#333333", // Dark Gray
                    color: "#D4D4D4", // Light Gray
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                    transition: "background-color 0.3s",
                }}
                onClick={updateEthBalance}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
            >
                {ethBalance !== null ? `${ethBalance.toFixed(2)} ETH` : "Loading..."}
            </button>

            {/* Reward Pool Circle */}
            <div
                style={{
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #252526, #2D2D2D)", // Grayscale gradient
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#D4D4D4", // Light Gray
                    textAlign: "center",
                    fontSize: "2rem",
                    fontWeight: "bold",
                    boxShadow: "0 0 30px rgba(160, 160, 160, 0.5)", // Medium Gray glow
                    border: "10px solid #333333", // Dark Gray border
                    position: "relative",
                }}
            >
                <div style={{ zIndex: 2 }}>
                    {ethBalance !== null ? `${ethBalance.toFixed(2)} ETH` : "Loading..."}
                </div>
                <div style={{ fontSize: "1rem", color: "#A0A0A0", marginTop: "10px" }}>
                    Reward Pool
                </div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "200%",
                        height: "60%",
                        background:
                            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 200 20\"%3E%3Cpath d=\"M0,15 C20,5 40,-5 60,15 C80,35 100,30 120,15 C140,0 160,-5 180,15 C200,35 220,30 240,15 L240,20 L0,20 Z\" fill=\"%23A0A0A0\" /%3E%3C/svg%3E')", // Medium Gray wave
                        animation: "waveMove 5s linear infinite, waveHeight 2s ease-in-out infinite",
                        backgroundSize: "100% 100%",
                    }}
                ></div>
            </div>

            {/* Side Buttons */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "30px",
                    transform: "translateY(-50%)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                }}
            >
                <button
                    style={{
                        padding: "12px 25px",
                        backgroundColor: "#333333", // Dark Gray
                        color: "#D4D4D4", // Light Gray
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                        transition: "background-color 0.3s",
                    }}
                    onClick={() => toast.info("Balance updated in MetaMask", { theme: "dark" })}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
                >
                    YOUR BALANCE
                </button>
                <button
                    style={{
                        padding: "12px 25px",
                        backgroundColor: "#333333", // Dark Gray
                        color: "#D4D4D4", // Light Gray
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
                        transition: "background-color 0.3s",
                    }}
                    onClick={showTokensPopup}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
                >
                    TOKENS USED: {tokensUsed}
                </button>
            </div>

            {/* Tokens Used Modal */}
            <Modal
                isOpen={showTokensModal}
                onRequestClose={() => setShowTokensModal(false)}
                contentLabel="Tokens Used Details"
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
                        width: "400px",
                        border: "1px solid #2D2D2D",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.6)",
                    },
                }}
            >
                <div className='flex flex-col items-center'>
                    <h2 className='text-2xl font-bold mb-4'>Tokens Used</h2>
                    <div className='w-full bg-[#252526] rounded-lg p-4 mb-4'>
                        <p className='text-sm mb-2'>
                            <span className='font-semibold'>Viewing Answers:</span> 10 tokens
                        </p>
                        <p className='text-sm mb-2'>
                            <span className='font-semibold'>Correct Answers:</span> 20 tokens
                        </p>
                        <p className='text-sm'>
                            <span className='font-semibold'>Total Tokens Used:</span> {tokensUsed}
                        </p>
                    </div>
                    <button
                        className='mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-colors'
                        style={{ backgroundColor: "#333333", color: "#D4D4D4" }}
                        onClick={() => setShowTokensModal(false)}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#3C3C3C")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#333333")}
                    >
                        Close
                    </button>
                </div>
            </Modal>

            {/* Inline Keyframes for Wave Animation */}
            <style>
                {`
                    @keyframes waveMove {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes waveHeight {
                        0%, 100% { height: 60%; }
                        50% { height: 70%; }
                    }
                `}
            </style>
        </div>
    );
};

export default RewardPool;