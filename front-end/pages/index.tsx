import Header from "@components/Header";
import Head from "next/head";

const Home: React.FC = () => {

    return (
        <>
        <Head>
            <title>Home</title>
        </Head>
        <Header/>
        <main className="container mx-auto px-6 py-8 text-center">
                <h1 className="text-3xl font-bold text-blue-800 mb-6">Home</h1>
                <section className="bg-white shadow-md rounded-lg p-6 text-lg">
                    <div>
                        Welcome to a better version than Spotify. <br />
                        Enjoy the music and delete Spotify. 9.99€ a month is a scam. <br />
                        No, just kidding, I love Spotify. It’s a pretty good app. <br />
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;