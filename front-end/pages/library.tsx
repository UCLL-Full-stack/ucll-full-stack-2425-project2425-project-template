import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import LibraryTable from '@components/libraryTable';
import { Game } from '@types';

const Library: React.FC = () => {
    let game1: Game = {
        id: 0,
        title: "Game 1",
        image: "/images/placeholder.png",
        categories: ["Action", "Adventure"],
        price: 49.99,
        discount: 10
    };
    const games = [game1];

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