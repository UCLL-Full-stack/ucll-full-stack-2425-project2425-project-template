import Head from "next/head";
import styles from "@/styles/home.module.css";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import EventService from "@/services/EventService";
import { Event } from "@/types";
import { Router, useRouter } from "next/router";
import EventOverview from "@/components/eventOverview";

const Home: React.FC = () => {
  const router = useRouter();
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
        <button
          className="btn btn-primary"
          onClick={() => {
            router.push("/add-event");
          }}
        >
          Add event
        </button>
        <EventOverview events={events} />
      </main>
    </>
  );
};
export default Home;
