import Header from "@components/header"
import Head from "next/head"

const Home: React.FC = () => {
    return (
        <>
            <Head>
            <title>Courses</title>
            <meta name="description" content="Courses app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
        </>
    )
};

export default Home;