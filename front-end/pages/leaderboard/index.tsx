import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useState } from 'react';
import { User } from '@types';

const Leaderboard: React.FC = () => {
    const [top10, setTop10] = useState<any>(null);
    const [leaderboard, setLeaderboard] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

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
                                {top10.includes(user) ? (
                                    <></>
                                ) : (
                                    <tr>
                                        <td>You</td>
                                        <td>{user.name}</td>
                                        <td>{user.score}</td>
                                    </tr>
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
