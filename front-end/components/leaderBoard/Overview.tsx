import playerService from '@services/playerService';
import { Player } from '@types';
import { useState, useEffect } from 'react';

const Overview: React.FC = () => {
    const [top10, setTop10] = useState<Array<Player>>();
    const [leaderboard, setLeaderboard] = useState<Array<Player>>();
    const [user, setUser] = useState<any>();

    const getLeaderboard = async () => {
        const response = await playerService.getAllPlayers();
        const players = await response.json();
        const sorted = players.sort((a: Player, b: Player) => {
            if (a.currency < b.currency) {
                return 1;
            }
            if (a.currency > b.currency) {
                return -1;
            }
            return 0;
        });
        setLeaderboard(sorted);
        setTop10(sorted.slice(0, 10));
    };

    useEffect(() => {
        getLeaderboard();
    }, []);
    return (
        <span className="flex flex-col justify-center items-center">
            <h2>Leaderboards</h2>
            {top10 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Place</th>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {top10.map((player, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{player.name}</td>
                                <td>{player.currency}</td>
                            </tr>
                        ))}
                        {user ? (
                            <>
                                {top10.includes(user) ? (
                                    <></>
                                ) : (
                                    <tr>
                                        <td>You</td>
                                        <td>{user.name}</td>
                                        <td>{user.score}</td>
                                    </tr>
                                )}
                            </>
                        ) : (
                            <p>No user logged in</p>
                        )}
                    </tbody>
                </table>
            ) : (
                <>
                    <p>loading leaderboard</p>
                </>
            )}
        </span>
    );
};

export default Overview;
