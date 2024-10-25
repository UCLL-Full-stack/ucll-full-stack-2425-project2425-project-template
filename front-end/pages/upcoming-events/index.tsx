import Header from "@components/header";
import Head from "next/head";

const UpcomingEvents: React.FC = () => {
    return (
        <>
            <Head>
                <title>Upcoming events</title>
                <meta name="description" content="Overview of upcoming events" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        </>
    )
};

export default UpcomingEvents;