import BestellingenOverzicht from "@/components/bestellingen/BestellingOverzicht";
import Header from "@/components/header";
import BestellingService from "@/services/BestellingService";
import { Bestelling } from "@/types";
import Head from "next/head";
import router from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import useInterval from "use-interval";

const Bestellingen: React.FC = () => {

    const [selectedBestelling, setSelectedBestelling] = useState<Bestelling>();

    const getBestellingen = async () => {
        const responses = await Promise.all([
            BestellingService.getAllBestellingen()
        ]);

        const [bestellingResponses] = responses;

        if (bestellingResponses.ok) {
            const bestellingen = await bestellingResponses.json();
            return { bestellingen }
        }
    }

    const { data, isLoading, error } = useSWR(
        "bestellingen",
        getBestellingen
    );

    useInterval(() => {
        mutate("bestellingen", getBestellingen());
    }, 5000);

    return (
        <>
            <Head>
                <title>Bestellingen</title>
                <meta name="description" content="BowlBuddies Pokebowl BEstellingen" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>Bestellingen</h1>
                <p>Lijst van alle bestellingen</p>
                <section>
                    {error && <p className="error-field">{error.message}</p>}
                    {!isLoading && <p>Loading...</p>}
                    {data && (
                        <BestellingenOverzicht bestellingen={data.bestellingen} selectBestelling={setSelectedBestelling} />
                    )}
                </section>
                <button onClick={() => { router.push(`/bestellingen/create-bestelling`); }}>Create new bestelling</button>
            </main>
        </>
    );
};

export default Bestellingen