import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import React, { useEffect, useState } from 'react';
import { Game } from '@types';
import LibraryService from '@services/LibraryService';

const userId = 1;

const Profile: React.FC = () => {
    const [games, setGames] = useState<Array<Game>>([]);

    const getGames = async () => {
        const response = await LibraryService.getAllLibraryGames(userId);
        const games = await response.json();
        setGames(games);
    }

    useEffect(() => {
            getGames()
        },
        []
    )

    return (
        <>
            <Head>
                <title>Setback | Profile</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <h1>Setback</h1>
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div>
                        <img
                            src="/images/placeholder.png"
                            alt="Profile picture"
                            style={{ width: '250px', height: 'auto' }}
                        />
                    </div>
                    <div>
                        <h2>Username</h2>
                        <p>Description</p>
                    </div>
                </div>

                <div style={{ marginTop: '5%' }}>
                    <h2>Owned games:</h2>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {games.map((game, index) => (
                            <tr key={index}>
                                <td>
                                    <img
                                        src={game.image}
                                        alt={game.title}
                                        style={{ width: '150px', height: 'auto' }}
                                    />
                                </td>
                                <td>{game.title}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}

export default Profile;