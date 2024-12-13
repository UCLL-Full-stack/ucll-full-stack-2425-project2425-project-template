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
  const [user, setUsers] = useState<UserInput[]>();
  const [showTickets, setShowTickets] = useState<boolean>(false);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const userData = loggedInUser ? JSON.parse(loggedInUser) : null;

    if (userData) {
      setShowTickets(true);
    }
  }, []);

  const handleEventClick = (eventId: number) => {
    sessionStorage.setItem('eventId', eventId.toString());
    router.push(`/upcoming-events/${eventId}`);
  };

  // Renew the events list when an event is removed
  const [myEvents, setMyEvents] = useState(events);

  const removeEvent = async (eventId: number) => {
    await EventService.removeFromMyEvents(email, eventId);

    // Renew the events list when an event is removed
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
                {/* <p>{new Date(event.date).toLocaleDateString()}</p> */}
                {/* <p className={styles.hiddenOb}>{event.location}</p>
                <p className={styles.hiddenOb}>{event.category}</p> */}
                {showTickets && (
                  event.tickets.length > 0 ? (
                    <div className={styles.eventTickets}>
                      {/* <h4>Tickets:</h4> */}
                      {event.tickets.map((ticket, index) => (
                        <div key={index}>
                          <button
                            type="button"
                            className="px-4 py-2 bg-white rounded"
                          >{ticket.type} €{ticket.cost}</button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <button
                      type="button"
                      className="px-4 py-2 bg-white rounded mb-1"
                      className={styles.noTickets}
                    >
                      Tickets not available yet.
                    </button>
                  )
                )}

                <div>
                  {showDeleteButton === true &&
                    <button
                      className={styles.removeButton}
                      onClick={(e) => {
                        // Instead of triggering handleEventClick, it should trigger removeEvent
                        e.stopPropagation();
                        removeEvent(event.id);
                      }}
                    ><img src="/icons/close-white.png" alt="Close icon" width="40px" height="40px" />
                    </button>
                  }
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-white">You don't have any upcoming events...</p>
        )}
      </section>
    </>
  )
};

export default EventOverview;