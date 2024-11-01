import { EventInput } from "@types";
import styles from '@styles/home.module.css';
import { useRouter } from "next/router";
import { useEffect } from "react";

type Props = {
    events: EventInput[];
};

const EventOverview: React.FC<Props> = ({events}: Props) => {

    const router = useRouter();

    const handleEventClick = (eventId: number) => {
        router.push(`/upcoming-events/${eventId}`);
    };

    return (
        <>
            <section className={styles.holder}>
              {events && events.length > 0 ? (
                <div className={styles.events}>
                {events.map((event, index) => (
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