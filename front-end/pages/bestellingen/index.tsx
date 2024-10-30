import Header from "@/components/header";
import Head from "next/head";

const Bestellingen: React.FC = () => {

    return (
        <>
            <Head>
                <title>Bestellingen</title>
                <meta name="description" content="BowlBuddies Pokebowl Ingredienten" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="assets/logo.png" />
            </Head>
            <Header />
            <main>
                <h1>Bestellingen</h1>
                <p>Lijst van alle bestellingen</p>
                <section>
                    <p>Hello</p>
                </section>
            </main>
        </>
    );
};

export default Bestellingen