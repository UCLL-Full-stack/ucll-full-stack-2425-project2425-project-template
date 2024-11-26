import EventService from "@/services/EventService";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Event } from "@/types";
import styles from "@/styles/eventDetails.module.css";

const EventDetails: React.FC = () => {
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);

  const fetchEvent = async () => {
    const { id } = router.query;
    const response = await EventService.getEventById(Number(id));
    if (response.ok) {
      const event = await response.json();
      setEvent(event);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [router.query.id]);

  const handleOnClick = () => {
    console.log("yep");
  };
  return (
    event && (
      <>
        <div className="d-flex flex-column ju">
          <h1 className={styles.title}>{event.name}</h1>

          <div
            key={event.id}
            className="event-card p-3 m-2 border rounded d-flex flex-column justify-content-center"
            onClick={() => {
              router.push(`/events/${event.id}`);
            }}
          >
            <p className={styles.p}>
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className={styles.p}>Price: {event.price}</p>
            <p className={styles.p}>
              Min Participants: {event.minParticipants}
            </p>
            <p className={styles.p}>
              Max Participants: {event.maxParticipants}
            </p>
            {event.location ? (
              <p className={styles.p}>
                Location: {event.location.street} {event.location.number},{" "}
                {event.location.city}, {event.location.country}
              </p>
            ) : (
              <p className={styles.p}>Location: Not available</p>
            )}
            <button
              className={styles.button}
              onClick={() => {
                handleOnClick();
              }}
            >
              <strong>Participate</strong>
            </button>
          </div>
        </div>
      </>
    )
  );
};
export default EventDetails;
