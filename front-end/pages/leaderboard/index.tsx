import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import { Player, User } from '@types';
import playerService from '@services/playerService';

const Leaderboard: React.FC = () => {
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
        <>
            <Head>
                <title>Demo Project</title>
                <meta name="description" content="Exam app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2">
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
            </main>
        </>
    );
};

export default Leaderboard;
