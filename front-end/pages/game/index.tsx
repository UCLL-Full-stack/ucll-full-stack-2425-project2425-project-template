import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '@types';
import userSerivce from '@services/userService';

const Game: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User>();
    const [userByEmail, setUserByEmail] = useState<User>();

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            userSerivce.getUserByEmail(JSON.parse(user).email).then((response) => {
                response.json().then((userByEmail) => {
                    setUserByEmail(userByEmail);
                });
            });
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

    return (
        <>
            <Head>
                <title>Game</title>
                <meta name="description" content="Exam app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2">
                {loggedInUser && (
                    <p className="text-3xl p-10 text-xl">
                        Welcome, {userByEmail?.name}
                        {localStorage.getItem('loggedInUser')
                            ? JSON.parse(localStorage.getItem('loggedInUser')!).name
                            : ''}
                        !
                    </p>
                )}
                <span className="flex flex-row justify-center items-center">
                    <p>
                        <Link
                            href="/game/characters"
                            className="w-full bg-blue-500 text-white font-medium p-4 m-4 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-3xl"
                        >
                            Characters
                        </Link>
                    </p>
                    <p>
                        <Link
                            href="/game/worlds"
                            className="w-full bg-blue-500 text-white font-medium p-4 m-4 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-3xl"
                        >
                            Worlds
                        </Link>
                    </p>
                </span>
            </main>
        </>
    );
};

export default Game;
