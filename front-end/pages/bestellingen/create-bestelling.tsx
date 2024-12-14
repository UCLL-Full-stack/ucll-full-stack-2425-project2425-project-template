import BestellingAanmaken from "@/components/bestellingen/BestellingAanmaken";
import Header from "@/components/header";
import PokebowlService from "@/services/PokebowlService";
import UserService from "@/services/UserService";
import { Pokebowl, User } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import useSWR from "swr";

const createNewBestelling: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


    const fetchUserWithBestellingen = async () => {
        if (loggedInUser != undefined) {
            const [userResponses, pokebowlResponses] = await Promise.all([
                UserService.getUserById(loggedInUser.id as unknown as string),
                PokebowlService.getAllPokebowls()
            ]);

            if (userResponses.ok && pokebowlResponses.ok) {
                const [user, pokebowl] = await Promise.all([
                    userResponses.json(),
                    pokebowlResponses.json(),
                ]);
                return { user, pokebowl };
            }
        }
    }

    const { data, isLoading, error } = useSWR("users", fetchUserWithBestellingen);

    useEffect(() => {
        const getUser = sessionStorage.getItem("loggedInUser")
        if (getUser) {
            const parsedUser = JSON.parse(getUser);
            setLoggedInUser(parsedUser as User);
        }
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
                    {error && <p className="error-field">{error.message}</p>}
                    {!isLoading && <p>Loading...</p>}
                    {data?.user && data.pokebowl &&
                        <BestellingAanmaken user={data.user} pokebowls={data.pokebowl} />
                    }
                </section>
            </main>
        </>
    )
}
export default createNewBestelling;