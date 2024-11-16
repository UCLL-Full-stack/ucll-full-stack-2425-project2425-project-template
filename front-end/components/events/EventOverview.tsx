import { EventInput } from "@types";
import styles from '@styles/home.module.css';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Props = {
  events: EventInput[];
};

const EventOverview: React.FC<Props> = ({ events }: Props) => {
  const router = useRouter();

  const handleEventClick = (eventId: number) => {
    router.push(`/upcoming-events/${eventId}`);
  };


  const [myEvents, setMyEvents] = useState(events)

  const removeEvent = (eventId: number) => {
    const updatedEvents = myEvents.filter(event => event.id != eventId);
    setMyEvents(updatedEvents);
    //after this the event is removed from your list.
  }

  return (
    <>
      <section className={styles.holder}>
        {myEvents && myEvents.length > 0 ? (
          <div className={styles.events}>
            {myEvents.map((event, index) => (
              <div
                key={index}
                className={styles.event}
                style={{ backgroundImage: `url(${event.backgroundImage})` }}
                onClick={() => handleEventClick(event.id)}
                role="button"
              >
                <div className={styles.overlay}></div>
                <h3>{event.name}</h3>
                <p className={styles.desc}>{event.description}</p>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p className={styles.hiddenOb}>{event.location}</p>
                <p className={styles.hiddenOb}>{event.category}</p>

                <button
                  className={styles.removeButton}
                  onClick={() => removeEvent(event.id)}
                >
                  Remove
                </button>

              </div>
            ))}
          </div>
        ) : (
          <p>There are no events yet.</p>
        )}
      </section>
    </>
  )
};

export default EventOverview;