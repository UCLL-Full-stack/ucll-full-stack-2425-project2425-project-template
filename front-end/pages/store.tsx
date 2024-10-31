import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { Game } from '@types';
import StoreTable from '@components/storeTable';

const Store: React.FC = () => {
    let game1: Game = {
        id: 0,
        title: "Game 1",
        image: "/images/placeholder.png",
        categories: ["Action", "Adventure"],
        price: 49.99,
        discount: 10
    };
    let game2: Game = {
        id: 0,
        title: "Game 2",
        image: "/images/placeholder.png",
        categories: ["Action"],
        price: 59.99
    };
    const games = [game1, game2];

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