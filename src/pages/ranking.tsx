import React, { useState } from 'react';
import { motion } from 'framer-motion';

const rankings = [
    { rank: 1, name: 'Alice', points: 1500 },
    { rank: 2, name: 'Bob', points: 1400 },
    { rank: 3, name: 'Charlie', points: 1300 },
    { rank: 4, name: 'David', points: 1200 },
    { rank: 5, name: 'Eve', points: 1100 },
    { rank: 6, name: 'Frank', points: 1000 },
    { rank: 7, name: 'Grace', points: 900 },
    { rank: 8, name: 'Hank', points: 800 },
    { rank: 9, name: 'Ivy', points: 700 },
    { rank: 10, name: 'Jack', points: 600 },
    // Add more rankings as needed
];

// Function to generate random avatar URLs
const getRandomAvatar = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`;

const Ranking: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRankings = rankings.filter((ranking) =>
        ranking.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Additional action on Enter, if needed
            console.log(`Search triggered for: ${searchTerm}`);
        }
    };

    return (
        <motion.section
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-black text-white px-6 py-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
        >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-tl from-gray-700 via-black to-gray-800 opacity-20 blur-2xl animate-pulse" />

            {/* Logo with Improved Animation */}
            <motion.img
                src="/logo.png"
                alt="Logo"
                className="w-48 h-48 mb-6 drop-shadow-xl"
                initial={{ scale: 0, rotate: -360 }}
                animate={{ scale: 1.3, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 10 }}
            />

            {/* Title */}
            <motion.h1
                className="text-6xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-500"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
            >
                Global Ranks
            </motion.h1>

            {/* Subtitle */}
            <motion.p
                className="text-lg mb-6 text-center"
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 120 }}
            >
                Discover the top performers and their global standings.
            </motion.p>

            {/* Search Bar */}
            <motion.div
                className="mb-8 w-full max-w-lg relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <input
                    type="text"
                    placeholder="Search for a player..."
                    className="w-full p-4 rounded-lg bg-gray-600 bg-opacity-70 text-white border border-gray-400 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
            </motion.div>

            {/* Rankings List */}
            <motion.ul
                className="w-full max-w-3xl space-y-4 overflow-y-auto h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-600"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0, scale: 0.95 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            delayChildren: 0.3,
                            staggerChildren: 0.1,
                        },
                    },
                }}
            >
                {filteredRankings.map((ranking) => (
                    <motion.li
                        key={ranking.rank}
                        className="relative bg-opacity-80 bg-gradient-to-r from-gray-600 to-gray-800 text-white p-4 rounded-lg shadow-lg flex items-center justify-between overflow-hidden"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        whileHover={{
                            scale: 1.05,
                            x: 10,
                            transition: { duration: 0.3 },
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={getRandomAvatar(ranking.name)}
                                alt={ranking.name}
                                className="w-12 h-12 rounded-full border-2 border-white"
                            />
                            <span className="font-bold text-lg">{ranking.rank}</span>
                            <span className="text-lg font-semibold hover:text-gray-300 transition-colors duration-300">
                                {ranking.name}
                            </span>
                        </div>
                        <span className="text-lg font-semibold">{ranking.points} pts</span>
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20 transition-opacity duration-300"
                        />
                    </motion.li>
                ))}
            </motion.ul>

            {/* No Results Message */}
            {filteredRankings.length === 0 && (
                <motion.div
                    className="mt-10 text-center text-xl text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    No players found. Try a different search term.
                </motion.div>
            )}
        </motion.section>
    );
};

export default Ranking;