import PlayerOverviewTable from "@/components/players/playerOverviewTable";
import Header from "@/components/header";
import PlayerService from "@/services/PlayerService";
import { Player } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Players: React.FC = () => {
    const [players, setPlayers] = useState<Player[]>([]);
    const router = useRouter();

    const getPlayers = async () => {
        try {
            const data = await PlayerService.getAllPlayers();
            setPlayers(data);
        } catch (error) {
            console.error('Failed to fetch players:', error);
        }
    };

    useEffect(() => {
        getPlayers();
    }, []);

    const handleAddPlayer = () => {
        router.push('/players/addPlayer');
    };

    return (
        <>
            <Head>
                <title>Players</title>
            </Head>
            <Header />
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-8">Players</h1>
                <section className="w-full max-w-4xl">
                    <PlayerOverviewTable
                        players={players}
                        setPlayers={setPlayers}
                    />
                </section>
                <button
                    onClick={handleAddPlayer}
                    className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Player
                </button>
            </main>
        </>
    );
};

export default Players;