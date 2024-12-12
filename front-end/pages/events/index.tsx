import Head from "next/head";
import styles from "@/styles/home.module.css";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import EventService from "@/services/EventService";
import { Event } from "@/types";
import { useRouter } from "next/router";
import EventOverview from "@/components/events/EventOverview";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [events, setEvents] = useState<Array<Event>>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      const response = await EventService.getAllEvents();
      setEvents(response);
    } catch (error) {
      setError(`Error: Failed to fetch events`);
    }
  };
  return (
    <>
      <Head>
        <title>Events - Eventer</title>
        <meta name="description" content="Eventer events page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className={styles.main}>
        {error && <strong className={styles.error}>{error}</strong>}
        <EventOverview events={events} />
        <button
          className="btn btn-primary"
          onClick={() => {
            router.push("/add-event");
          }}
        >
          {t("event.button")}
        </button>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Home;
