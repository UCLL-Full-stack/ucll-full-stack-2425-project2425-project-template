import Header from "@/components/header";
import Head from "next/head";
import styles from "@/styles/home.module.css";
import AddEventForm from "@/components/addEventForm";

const addEvent: React.FC = () => {
  return (
    <>
      <Head>
        <title>Add event - Eventer</title>
        <meta name="description" content="Eventer events page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className={styles.main}>
        <AddEventForm />
      </main>
    </>
  );
};
export default addEvent;
