import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import { Game } from '@types';
import { useEffect, useState } from 'react';
import GameService from '@services/GameService';
import LibraryService from '@services/LibraryService';

const Library: React.FC = () => {
    const [games, setGames] = useState<Array<Game>>([]);

    const getGames = async () => {
        const response = await LibraryService.getAllLibraryGames();
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
                <title>Setback | Library</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <h1>Library</h1>
                </span>

                <div className={styles.description}>
                    <p>Here are your games.</p>
                </div>

                <LibraryTable games={games} />
            </main>
        </>
    )
}

export default Library;