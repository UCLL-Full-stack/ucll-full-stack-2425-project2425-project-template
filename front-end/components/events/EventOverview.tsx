import { EventInput } from "@types";
import styles from '@styles/home.module.css';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import EventService from "@services/EventService";

type Props = {
  events: EventInput[],
  showDeleteButton: boolean,
  email: string,
};

const EventOverview: React.FC<Props> = ({ events, showDeleteButton, email }: Props) => {
  const router = useRouter();

  const handleEventClick = (eventId: number) => {
    router.push(`/upcoming-events/${eventId}`);
  };

  const [myEvents, setMyEvents] = useState(events)

  const removeEvent = async (eventId: number) => {
    await EventService.removeFromMyEvents(email, eventId);
    setMyEvents(myEvents.filter(event => event.id !== eventId));
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

                <div>
                  {showDeleteButton === true &&
                    <button
                      className={styles.removeButton}
                      onClick={(e) => {
                        // Instead of triggering handleEventClick, it should trigger removeEvent
                        e.stopPropagation();
                        removeEvent(event.id);
                      }}
                    >Remove
                    </button>
                  }
                </div>
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