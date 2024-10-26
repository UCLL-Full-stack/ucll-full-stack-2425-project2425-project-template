import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import EventService from "@/services/EventService";
import EventOverview from "@/components/EventOverview";
import { Event } from "@/types";

const Home: React.FC = () => {
  const [events, setEvents] = useState<Array<Event>>([]);

  const getEvents = async () => {
    const response = await EventService.getAllEvents();
    if (response.ok) {
      const events = await response.json();
      setEvents(events);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="Eventer events page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className={styles.main}>
        <EventOverview events={events} />
      </main>
    </>
  );
};
export default Home;
