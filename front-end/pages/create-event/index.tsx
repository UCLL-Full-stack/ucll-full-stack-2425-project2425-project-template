import Header from "@components/header";
import Head from "next/head";

const CreateEvent: React.FC = () => {
    return (
        <>
            <Head>
                <title>Create event</title>
                <meta name="description" content="Creating your own event" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        </>
    )
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default CreateEvent;