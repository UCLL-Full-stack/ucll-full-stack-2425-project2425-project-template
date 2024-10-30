import BestellingenOverzicht from "@/components/bestellingen/BestellingOverzicht";
import Header from "@/components/header";
import BestellingService from "@/services/BestellingService";
import { Bestelling } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Bestellingen: React.FC = () => {

    const [bestellingen, setBestellingen] = useState<Array<Bestelling>>();
    const [selectedBestelling, setSelectedBestelling] = useState<Bestelling>();

    const getBestellingen = async () => {
        const response = await BestellingService.getAllBestellingen();
        const bestellingen = await response.json();
        setBestellingen(bestellingen);
    }

    useEffect(() => {
        getBestellingen();
    }, []);

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
                    {bestellingen && (
                        <BestellingenOverzicht bestellingen={bestellingen} selectBestelling={setSelectedBestelling} />
                    )}
                </section>
            </main>
        </>
    );
};

export default Bestellingen