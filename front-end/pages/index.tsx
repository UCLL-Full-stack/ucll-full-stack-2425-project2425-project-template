import Header from "@components/header";
import Head from "next/head";
import styles from '@styles/home.module.css';

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Eventora</title>
                <meta name="description" content="Eventora app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <h1>Your go-to app for local events</h1>
                </span>

                <div className={styles.description}>
                    <p>
                    Stay up to date with all the latest events in your local area. 
                    Whether it's concerts, workshops, community gatherings, or sports activities, 
                    you’ll find something that fits your interests. Discover what's happening near you and never miss out on the fun! <br /><br />
                    Have an idea for an event? Host it through Eventora! From private get-togethers to public festivals, 
                    you can easily create and manage your events. Invite friends, family, or the entire community, 
                    and watch your event grow as people RSVP and engage with your event details.
                    </p>
                </div>
            </main>
        </>
    )
};

export default Home;