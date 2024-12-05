import BestellingAanmaken from "@/components/bestellingen/BestellingAanmaken";
import Header from "@/components/header";
import PokebowlService from "@/services/PokebowlService";
import UserService from "@/services/UserService";
import { Pokebowl, User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const createNewBestelling: React.FC = () => {
    const [pokebowls, setPokebowls] = useState<Array<Pokebowl>>([]);
    const [user, setUser] = useState<User>();

    const getPokebowls = async () => {
        const response = await PokebowlService.getAllPokebowls();
        const pokebowls = await response.json();
        setPokebowls(pokebowls);
    }

    const getUser = async (id: string) => {
        const response = await UserService.getUserById(id);
        const user = await response.json();
        setUser(user);
    }

    useEffect(() => {
        getPokebowls();
        getUser("14");
    }, []);
    return (
        <>
            <Head>
                <title>Create bestelling</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>Bestelling</h1>
                <section>
                    {user && pokebowls &&
                        <BestellingAanmaken user={user} pokebowls={pokebowls} />
                    }
                </section>
            </main>
        </>
    )
}
export default createNewBestelling;