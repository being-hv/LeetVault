// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useSetRecoilState } from 'recoil';
// import { ethers } from 'ethers';
// import { authModalState } from '@/atoms/authModalAtom';

// declare global {
//     interface Window {
//         ethereum: any;
//     }
// }

// type NavbarProps = {};

// const Navbar: React.FC<NavbarProps> = () => {
//     const setAuthModalState = useSetRecoilState(authModalState);
//     const handleMetaMaskConnect = async () => {
//         if (typeof window !== 'undefined' && window.ethereum) {
//             try {
//                 // Request MetaMask connection and trigger the wallet pop-up
//                 console.log("Requesting accounts...");
//                 const accounts = await window.ethereum.request({
//                     method: 'eth_requestAccounts',
//                 });

//                 // Create a provider and signer using ethers.js
//                 const provider = new ethers.BrowserProvider(window.ethereum); // For ethers v6+
//                 const signer = await provider.getSigner();
//                 const address = await signer.getAddress();

//                 // Check if MetaMask pop-up was shown and if accounts were returned
//                 if (accounts && accounts.length > 0) {
//                     alert(`Connected wallet address: ${ address }`);
//                 } else {
//                     alert("MetaMask connection failed. Please try again.");
//                 }
//             } catch (error: any) {
//                 console.error('Error connecting to MetaMask:', error);
//                 alert(error?.message || 'Failed to connect to MetaMask. Please try again.');
//             }
//         } else {
//             alert('MetaMask is not installed. Please install MetaMask to use this feature.');
//         }
//     };

//     const handleClick = () => {
//         setAuthModalState((prev) => ({
//             ...prev,
//             isOpen: true,
//         }));
//     };

//     return (
//         <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
//             <Link href="/" className="flex items-center justify-center h-20">
//                 <Image src="/logo.png" alt="LeetVault" height={300} width={300} />
//             </Link>
//             <div className="flex items-center space-x-4">
//                 <button
//                     className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
//                     transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
//                 >
//                     <span
//                         className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
//                         group-hover:opacity-100 group-hover:animate-glitter"
//                         style={{
//                             backgroundSize: '300%',
//                         }}
//                     ></span>
//                     <span
//                         className="relative z-10 flex items-center justify-center font-bold
//                         group-hover:animate-sparkle"
//                     >
//                         Global Ranks
//                     </span>
//                     </button>
//                 <button
//                     className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
//                     transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
//                 >
//                     <span
//                         className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
//                         group-hover:opacity-100 group-hover:animate-glitter"
//                         style={{
//                             backgroundSize: '300%',
//                         }}
//                     ></span>
//                     <span
//                         className="relative z-10 flex items-center justify-center font-bold
//                         group-hover:animate-sparkle"
//                     >
//                         Vote for your Vault Leaders
//                     </span>
//                 </button>
//                 <button
//                     className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
//                     transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
//                     onClick={handleClick}
//                 >
//                     <span
//                         className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
//                         group-hover:opacity-100 group-hover:animate-glitter"
//                         style={{
//                             backgroundSize: '300%',
//                         }}
//                     ></span>
//                     <span
//                         className="relative z-10 flex items-center justify-center font-bold
//                         group-hover:animate-sparkle"
//                     >
//                         Sign In
//                     </span>
//                 </button>
//                 <button
//                     className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
//                     transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
//                     onClick={handleMetaMaskConnect}
//                 >
//                     <span
//                         className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
//                         group-hover:opacity-100 group-hover:animate-glitter"
//                         style={{
//                             backgroundSize: '300%',
//                         }}
//                     ></span>
//                     <span
//                         className="relative z-10 flex items-center justify-center font-bold
//                         group-hover:animate-sparkle"
//                     >
//                         Your Vault
//                     </span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Navbar;

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Import useRouter
import { useSetRecoilState } from 'recoil';
import { ethers } from 'ethers';
import { authModalState } from '@/atoms/authModalAtom';

declare global {
    interface Window {
        ethereum: any;
    }
}

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter(); // Initialize useRouter

    const handleMetaMaskConnect = async () => {
        if (typeof window !== 'undefined' && window.ethereum) {
            try {
                console.log('Requesting accounts...');
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const address = await signer.getAddress();

                if (accounts && accounts.length > 0) {
                    alert(`Connected wallet address: ${address}`);
                } else {
                    alert('MetaMask connection failed. Please try again.');
                }
            } catch (error: any) {
                console.error('Error connecting to MetaMask:', error);
                alert(error?.message || 'Failed to connect to MetaMask. Please try again.');
            }
        } else {
            alert('MetaMask is not installed. Please install MetaMask to use this feature.');
        }
    };

    const handleClick = () => {
        setAuthModalState((prev) => ({
            ...prev,
            isOpen: true,
        }));
    };

    const handleClick2 = () => {
        router.push('/ranking'); 
    };

    const handleClick3 = () => {
        router.push('/rewardPool');
    };

    return (
        <div className="flex items-center justify-between sm:px-12 px-2 md:px-24">
            <Link href="/" className="flex items-center justify-center h-20">
                <Image src="/logo.png" alt="LeetVault" height={300} width={300} />
            </Link>
            <div className="flex items-center space-x-4">
                <button
                    className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
                    transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
                    onClick={handleClick2} 
                >
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
                        group-hover:opacity-100 group-hover:animate-glitter"
                        style={{
                            backgroundSize: '300%',
                        }}
                    ></span>
                    <span
                        className="relative z-10 flex items-center justify-center font-bold
                        group-hover:animate-sparkle"
                    >
                        LeetVault's Global Rankings
                    </span>
                </button>
                <button
                    className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
                    transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
                >
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
                        group-hover:opacity-100 group-hover:animate-glitter"
                        style={{
                            backgroundSize: '300%',
                        }}
                    ></span>
                    <span
                        className="relative z-10 flex items-center justify-center font-bold
                        group-hover:animate-sparkle"
                    >
                        Vote for your Vault Leaders
                    </span>
                </button>
                <button
                    className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
                    transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
                    onClick={handleClick}
                >
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
                        group-hover:opacity-100 group-hover:animate-glitter"
                        style={{
                            backgroundSize: '300%',
                        }}
                    ></span>
                    <span
                        className="relative z-10 flex items-center justify-center font-bold
                        group-hover:animate-sparkle"
                    >
                        Sign In
                    </span>
                </button>
                <button
                    className="relative bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-3 py-2 sm:px-5 rounded-md font-semibold text-sm
                    transition-transform duration-300 ease-in-out transform hover:scale-110 overflow-hidden group"
                    onClick={handleMetaMaskConnect}
                >
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-500 to-yellow-300 opacity-0 blur-md
                        group-hover:opacity-100 group-hover:animate-glitter"
                        style={{
                            backgroundSize: '300%',
                        }}
                    ></span>
                    <span
                        className="relative z-10 flex items-center justify-center font-bold
                        group-hover:animate-sparkle"
                        onClick={handleClick3}
                    >
                        Your Vault
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Navbar;