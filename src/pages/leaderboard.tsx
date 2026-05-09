import React, { useState, useCallback, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Crown, Search, Feather as Ethereum, X, Trophy, Target } from 'lucide-react';

// ==================== TYPES ====================
interface Member {
    id: string;
    rank: number;
    name: string;
    profileImage: string;
    points: number;
    solved: number;
    ethCoins: number;
    country: string;
    accuracy: number;
}

// ==================== MOCK DATA ====================
const leaderboardData: Member[] = [
    {
        id: '1',
        rank: 1,
        name: 'Alex Morgan',
        profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 9875,
        solved: 487,
        ethCoins: 142.5,
        country: 'USA',
        accuracy: 98,
    },
    {
        id: '2',
        rank: 2,
        name: 'Sophia Chen',
        profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 9456,
        solved: 463,
        ethCoins: 137.2,
        country: 'China',
        accuracy: 96,
    },
    {
        id: '3',
        rank: 3,
        name: 'Marcus Johnson',
        profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 9127,
        solved: 451,
        ethCoins: 125.8,
        country: 'UK',
        accuracy: 95,
    },
    {
        id: '4',
        rank: 4,
        name: 'Elena Rodriguez',
        profileImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 8932,
        solved: 428,
        ethCoins: 115.9,
        country: 'Spain',
        accuracy: 94,
    },
    {
        id: '5',
        rank: 5,
        name: 'Raj Patel',
        profileImage: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 8764,
        solved: 413,
        ethCoins: 109.3,
        country: 'India',
        accuracy: 92,
    },
    {
        id: '6',
        rank: 6,
        name: 'Olivia Kim',
        profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 8591,
        solved: 402,
        ethCoins: 101.7,
        country: 'S. Korea',
        accuracy: 91,
    },
    {
        id: '7',
        rank: 7,
        name: 'David Müller',
        profileImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 8347,
        solved: 392,
        ethCoins: 97.1,
        country: 'Germany',
        accuracy: 89,
    },
    {
        id: '8',
        rank: 8,
        name: 'Aisha Mohammed',
        profileImage: 'https://images.pexels.com/photos/1820559/pexels-photo-1820559.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 8203,
        solved: 387,
        ethCoins: 92.6,
        country: 'UAE',
        accuracy: 88,
    },
    {
        id: '9',
        rank: 9,
        name: 'Lucas Silva',
        profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
        points: 8076,
        solved: 371,
        ethCoins: 88.4,
        country: 'Brazil',
        accuracy: 86,
    },
];

// ==================== COMPONENTS ====================

// Profile Avatar Component
interface ProfileAvatarProps {
    src: string;
    alt: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    border?: boolean;
    glow?: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
    src,
    alt,
    size,
    border = false,
    glow = false,
}) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16',
        xl: 'w-24 h-24',
    };

    return (
        <div className={`relative rounded-full overflow-hidden ${sizeClasses[size]}`}>
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover ${border ? 'ring-2 ring-orange-500' : ''
                    } ${glow ? 'shadow-glow' : ''}`}
            />
        </div>
    );
};

// Search Bar Component
interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    return (
        <div className="relative w-full max-w-md mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-orange-500" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 rounded-lg bg-gray-800 text-gray-200 
                   placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 
                   focus:shadow-orange transition-all duration-300"
                placeholder="Search players..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

// Podium Component
interface PodiumProps {
    topThree: Member[];
    onSelect: (member: Member) => void;
}

const Podium: React.FC<PodiumProps> = ({ topThree, onSelect }) => {
    if (topThree.length < 3) return null;

    const first = topThree.find(m => m.rank === 1);
    const second = topThree.find(m => m.rank === 2);
    const third = topThree.find(m => m.rank === 3);

    if (!first || !second || !third) return null;

    return (
        <div className="flex items-end justify-center my-8 lg:my-12">
            {/* Second Place */}
            <div
                className="flex flex-col items-center transform transition-all hover:scale-105 cursor-pointer"
                onClick={() => onSelect(second)}
            >
                <div className="mb-3 flex flex-col items-center">
                    <ProfileAvatar
                        src={second.profileImage}
                        alt={second.name}
                        size="lg"
                        border
                    />
                    <div className="mt-2 text-gray-200 font-medium">{second.name}</div>
                </div>

                <div className="bg-gray-900 w-24 h-32 flex items-center justify-center rounded-t-lg border-t-2 border-orange-500 shadow-md">
                    <span className="text-4xl font-bold text-orange-400 animate-float-gentle">2</span>
                </div>
            </div>

            {/* First Place */}
            <div
                className="flex flex-col items-center -mx-2 z-10 transform transition-all hover:scale-105 cursor-pointer"
                onClick={() => onSelect(first)}
            >
                <div className="relative mb-3 flex flex-col items-center">
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
                        <Crown className="w-8 h-8 text-orange-500 animate-pulse" />
                    </div>

                    <ProfileAvatar
                        src={first.profileImage}
                        alt={first.name}
                        size="xl"
                        border
                        glow
                    />
                    <div className="mt-2 text-gray-200 font-medium text-lg">{first.name}</div>
                </div>

                <div className="bg-gray-900 w-32 h-44 flex items-center justify-center rounded-t-lg border-t-4 border-orange-500 shadow-xl">
                    <span className="text-6xl font-bold text-orange-500 animate-float">1</span>
                </div>
            </div>

            {/* Third Place */}
            <div
                className="flex flex-col items-center transform transition-all hover:scale-105 cursor-pointer"
                onClick={() => onSelect(third)}
            >
                <div className="mb-3 flex flex-col items-center">
                    <ProfileAvatar
                        src={third.profileImage}
                        alt={third.name}
                        size="lg"
                        border
                    />
                    <div className="mt-2 text-gray-200 font-medium">{third.name}</div>
                </div>

                <div className="bg-gray-900 w-24 h-24 flex items-center justify-center rounded-t-lg border-t-2 border-orange-500 shadow-md">
                    <span className="text-4xl font-bold text-orange-300 animate-float-gentle">3</span>
                </div>
            </div>
        </div>
    );
};

// Leaderboard Table Component
interface LeaderboardTableProps {
    members: Member[];
    onSelect: (member: Member) => void;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ members, onSelect }) => {
    return (
        <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left bg-gray-900">
                            <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Rank
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Profile
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Points
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                Solved
                            </th>
                            <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                ETH Coins
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-800 divide-y divide-gray-700">
                        {members.map((member, index) => (
                            <tr
                                key={member.id}
                                className="hover:bg-gray-700 cursor-pointer transition-all duration-200 transform hover:scale-[1.01] animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => onSelect(member)}
                            >
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-lg font-semibold text-gray-300">#{member.rank}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <ProfileAvatar src={member.profileImage} alt={member.name} size="sm" />
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-200">{member.name}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">{member.points.toLocaleString()}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="text-sm text-gray-300">{member.solved}</div>
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    <div className="flex items-center text-sm font-medium text-orange-500">
                                        <Ethereum className="h-4 w-4 mr-1" />
                                        {member.ethCoins.toFixed(1)}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Member Detail View Component
interface MemberDetailViewProps {
    member: Member;
    onClose: () => void;
}

const MemberDetailView: React.FC<MemberDetailViewProps> = ({ member, onClose }) => {
    const [animation, setAnimation] = useState('animate-slide-in');
    const [isVisible, setIsVisible] = useState(true);
    const [counters, setCounters] = useState({
        points: 0,
        solved: 0,
        ethCoins: 0,
        accuracy: 0
    });

    const handleClose = () => {
        setAnimation('animate-slide-out');
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    useEffect(() => {
        const duration = 1500;
        const steps = 20;
        const interval = duration / steps;

        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep += 1;
            const progress = currentStep / steps;

            setCounters({
                points: Math.floor(member.points * progress),
                solved: Math.floor(member.solved * progress),
                ethCoins: Number((member.ethCoins * progress).toFixed(1)),
                accuracy: Math.floor(member.accuracy * progress)
            });

            if (currentStep >= steps) {
                clearInterval(timer);
                setCounters({
                    points: member.points,
                    solved: member.solved,
                    ethCoins: member.ethCoins,
                    accuracy: member.accuracy
                });
            }
        }, interval);

        return () => clearInterval(timer);
    }, [member]);

    const ProgressBar = ({ value, max, color }: { value: number, max: number, color: string }) => {
        const percentage = (value / max) * 100;
        return (
            <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        );
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`relative bg-gray-800 w-full max-w-lg rounded-lg shadow-xl ${animation}`}
            >
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="p-6">
                    <div className="flex items-center mb-6">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500 mr-4">
                            <span className="text-xl font-bold text-white">#{member.rank}</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">{member.name}</h2>
                            <div className="flex items-center text-gray-400">
                                <span className="mr-2">{member.country}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mb-6">
                        <ProfileAvatar
                            src={member.profileImage}
                            alt={member.name}
                            size="xl"
                            border
                            glow
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <Trophy className="w-5 h-5 text-orange-500 mr-2" />
                                <h3 className="text-sm font-medium text-gray-400">POINTS</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">{counters.points.toLocaleString()}</p>
                            <ProgressBar value={counters.points} max={10000} color="bg-orange-500" />
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <Target className="w-5 h-5 text-orange-500 mr-2" />
                                <h3 className="text-sm font-medium text-gray-400">SOLVED</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">{counters.solved}</p>
                            <ProgressBar value={counters.solved} max={500} color="bg-orange-500" />
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <Ethereum className="w-5 h-5 text-orange-500 mr-2" />
                                <h3 className="text-sm font-medium text-gray-400">ETH COINS</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">{counters.ethCoins}</p>
                            <ProgressBar value={counters.ethCoins} max={200} color="bg-orange-500" />
                        </div>

                        <div className="bg-gray-900 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <Target className="w-5 h-5 text-orange-500 mr-2" />
                                <h3 className="text-sm font-medium text-gray-400">ACCURACY</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">{counters.accuracy}%</p>
                            <ProgressBar value={counters.accuracy} max={100} color="bg-green-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ==================== HOOK ====================
const useLeaderboard = () => {
    const [members, setMembers] = useState<Member[]>(leaderboardData);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const topThree = members.filter(m => m.rank <= 3);
    const restOfTable = members.filter(m => m.rank > 3);

    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setMembers(leaderboardData);
            return;
        }

        const filtered = leaderboardData.filter(
            member => member.name.toLowerCase().includes(query.toLowerCase())
        );
        setMembers(filtered);
    }, []);

    const handleSelectMember = useCallback((member: Member) => {
        setSelectedMember(member);
    }, []);

    const handleCloseMemberDetails = useCallback(() => {
        setSelectedMember(null);
    }, []);

    return {
        members,
        topThree,
        restOfTable,
        selectedMember,
        searchQuery,
        handleSearch,
        handleSelectMember,
        handleCloseMemberDetails,
    };
};

// ==================== MAIN APP ====================
function App() {
    const {
        topThree,
        restOfTable,
        selectedMember,
        searchQuery,
        handleSearch,
        handleSelectMember,
        handleCloseMemberDetails,
    } = useLeaderboard();

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-orange-500">Global Leaderboard</h1>
                    <p className="text-gray-400">Top performers competing for glory</p>
                </header>

                <SearchBar
                    value={searchQuery}
                    onChange={handleSearch}
                />

                <Podium
                    topThree={topThree}
                    onSelect={handleSelectMember}
                />

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-300">Rankings</h2>
                    <LeaderboardTable
                        members={restOfTable}
                        onSelect={handleSelectMember}
                    />
                </div>
            </div>

            {selectedMember && (
                <MemberDetailView
                    member={selectedMember}
                    onClose={handleCloseMemberDetails}
                />
            )}
        </div>
    );
}

// ==================== ENTRY POINT ====================
const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}

export default App;
