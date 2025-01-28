import React, { useState } from "react";

type rewardPoolProps = {};

const rewardPool: React.FC<rewardPoolProps> = () => {
    const [ethBalance, setEthBalance] = useState(999.98);
    const [tokensUsed, setTokensUsed] = useState(0);

    const updateEthBalance = () => {
        setEthBalance((prev) => parseFloat((prev + 0.05).toFixed(2)));
    };

    const showPopup = () => {
        alert(
            `Tokens used: \n10 tokens for viewing answers\n20 tokens for correct answers.`
        );
        setTokensUsed((prev) => prev + 10);
    };

    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                background: "linear-gradient(135deg, #000000, #ff8c00)",
                height: "100vh",
                overflow: "hidden",
                color: "white",
                margin: 0,
            }}
        >
            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: "4rem",
                    fontFamily: "Cursive, sans-serif",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    color: "#000000",
                    textShadow: "0 0 10px #ff8c00, 0 0 20px #ff4500",
                }}
            >
                RewardVault
            </div>

            <button
                style={{
                    position: "absolute",
                    top: "40px",
                    right: "40px",
                    padding: "12px 25px",
                    backgroundColor: "#ff4500",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                }}
                onClick={updateEthBalance}
            >
                {ethBalance.toFixed(2)} ETH
            </button>

            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "400px",
                    height: "400px",
                    borderRadius: "50%",
                    background: "black",
                    overflow: "hidden",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    textAlign: "center",
                    fontSize: "1.5rem",
                    boxShadow: "0 0 30px #ff8c00, 0 0 60px #ff4500",
                    border: "10px solid transparent",
                    backgroundImage: "radial-gradient(circle, #ff8c00, #ff4500)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "content-box",
                }}
            >
                <div style={{ zIndex: 2 }}>{ethBalance.toFixed(2)} ETH</div>
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "200%",
                        height: "60%",
                        background:
                            "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100%\" height=\"100%\" viewBox=\"0 0 200 20\"%3E%3Cpath d=\"M0,15 C20,5 40,-5 60,15 C80,35 100,30 120,15 C140,0 160,-5 180,15 C200,35 220,30 240,15 L240,20 L0,20 Z\" fill=\"%23ff8c00\" /%3E%3C/svg%3E')",
                        animation: "waveMove 5s linear infinite, waveHeight 2s ease-in-out infinite",
                        backgroundSize: "100% 100%",
                    }}
                ></div>
            </div>

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
                        backgroundColor: "#ff4500",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                        transition: "background-color 0.3s",
                    }}
                    onClick={() => alert("Your balance is updated in MetaMask")}
                >
                    YOUR BALANCE
                </button>
                <button
                    style={{
                        padding: "12px 25px",
                        backgroundColor: "#ff4500",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "1rem",
                        cursor: "pointer",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
                        transition: "background-color 0.3s",
                    }}
                    onClick={showPopup}
                >
                    TOKENS USED: {tokensUsed}
                </button>
            </div>
        </div>
    );
};

export default rewardPool;