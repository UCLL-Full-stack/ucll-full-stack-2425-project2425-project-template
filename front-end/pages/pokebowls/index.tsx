import Header from "@/components/header";
import PokebowlOverzicht from '@/components/pokebowls/PokebowlOverzicht';
import PokebowlService from "@/services/PokebowlService";
import { Pokebowl } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Pokebowls: React.FC = () => {
    const [pokebowls, setPokebowls] = useState<Array<Pokebowl>>();
    const [selectedPokebowl, setSelectedPokebowl] = useState<Pokebowl>();

    const getPokebowls = async () => {
        const response = await PokebowlService.getAllPokebowls();
        const pokebowls = await response.json();
        setPokebowls(pokebowls);
    }

    useEffect(() => {
        getPokebowls();
    }, []);

    return (
        <>
            <Head>
                <title>Pokebowls</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>Pokebowls</h1>
                <p>Lijst van alle pokebowls</p>
                <section>
                    {pokebowls && (
                        <PokebowlOverzicht pokebowls={pokebowls} selectPokebowl={setSelectedPokebowl} />
                    )}
                </section>
            </main>
        </>
    );
};

export default Pokebowls