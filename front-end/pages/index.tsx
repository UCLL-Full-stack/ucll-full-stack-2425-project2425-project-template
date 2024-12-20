import Head from "next/head"
import Header from "@components/header";
import styles from "@styles/home.module.css"

const Home: React.FC = () => {
    return(
        <>
            <Head>
                <title>Main Page</title>
                <meta name="description" content="Exam app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header></Header>
            <main className="text-center md:mt-24 mx-auto md:w-3/5 lg:w-1/2">
                <span className="flex flex-row justify-center items-center">
                <p></p>
                </span>
            </main>
        </>
    )
}


export default Home;
