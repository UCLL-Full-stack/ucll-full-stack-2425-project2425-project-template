import Head from "next/head"
import Header from "@components/header";
import CharacterSelection from "@components/game/CharacterSelection";
import styles from "@styles/home.module.css";
import Link from 'next/link';
import BattleScreen from "@components/game/Battle";
import { useEffect, useState } from "react";
import { Player } from "@types";
import playerService from "@services/playerService";

const Characters: React.FC = () => {
    const [player, setPlayer] = useState<Player | null>(null);

    const getPlayer = async() => {
        const id = localStorage.getItem("selectedCharacter");
        if (id){
            const res = await playerService.getPlayerById(id);
            setPlayer(res);
        }
    }

    useEffect(() => {
            getPlayer();
    }, []);

    return(
        <>
            <Head>
                <title>Main Page</title>
                <meta name="description" content="Exam app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2">
                {player ? (<BattleScreen player={player}></BattleScreen>):(<></>)}
            </main>
        </>
    )
}


export default Characters;