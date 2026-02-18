import React from 'react';

const leaderboardData = [
    { rank: 1, team: 'Team Phoenix', score: 95, status: 'Final' },
    { rank: 2, team: 'Team Innovators', score: 92, status: 'Final' },
    { rank: 3, team: 'Team Visionaries', score: 88, status: 'Final' },
    { rank: 4, team: 'Team Creators', score: 85, status: 'Final' },
    { rank: 5, team: 'Team Pioneers', score: 82, status: 'Final' },
    { rank: 6, team: 'Team Phoenix', score: 95, status: 'Final' },
    { rank: 7, team: 'Team Innovators', score: 92, status: 'Final' },
    { rank: 8, team: 'Team Visionaries', score: 88, status: 'Final' },
    { rank: 9, team: 'Team Creators', score: 85, status: 'Final' },
    { rank: 10, team: 'Team Pioneers', score: 82, status: 'Final' }
];

const TeamLeaderboard = () => {
    return (
        <div className='md:pt-[100px]  pt-[90px] px-4'>
            <h2 className='text-3xl text-center font-semibold mb-5 text-orange-500 '>Leaderboard</h2>
            <div className='overflow-x-auto'>
                <table className='min-w-full bg-[#fff7f3] border border-gray-300 border-collapse rounded-lg overflow-hidden'>
                    <thead>
                        <tr className='text-white text-center bg-orange-400 '>
                            <th className='py-3 px-4 border border-gray-300'>Rank</th>
                            <th className='py-3 px-4 border border-gray-300'>Team</th>
                            <th className='py-3 px-4 border border-gray-300'>Score</th>
                            <th className='py-3 px-4 border border-gray-300'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaderboardData.map((team, index) => (
                            <tr key={index} className='hover:bg-[#fff0ea] text-center transition'>
                                <td className='py-3 px-4 border border-gray-300 font-medium'>{team.rank}</td>
                                <td className='py-3 px-4 border border-gray-300'>{team.team}</td>
                                <td className='py-3 px-4 border border-gray-300 text-[#db5422] font-semibold'>
                                    {team.score}
                                </td>
                                <td className='py-3 px-4 border border-gray-300'>
                                    <span className='bg-orange-500 text-white  px-5 py-1 rounded-full'>
                                        {team.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeamLeaderboard;
