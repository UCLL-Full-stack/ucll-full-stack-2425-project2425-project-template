import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { Game } from '@types';
import StoreTable from '@components/storeTable';
import React, { useEffect, useState } from 'react';
import GameService from '@services/GameService';

const Store: React.FC = () => {
    const [games, setGames] = useState<Array<Game>>([]);

    const getGames = async () => {
        const response = await GameService.getAllGames();
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
                <title>Setback | Store</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <h1>Setback Store</h1>
                </span>

                <div className={styles.description}>
                    <p>Check out our catalog.</p>
                </div>

                <StoreTable games={games} />
            </main>
        </>
    )
}

export default Store;