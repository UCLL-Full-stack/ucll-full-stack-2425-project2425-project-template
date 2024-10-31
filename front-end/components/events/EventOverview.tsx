import { Event } from "@types";

type Props = {
    events: Event[];
};

const EventOverview: React.FC<Props> = ({events}: Props) => {
  
    // Sort events by date
    const sortedEvents = events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return (
        <>
            <section>
              {sortedEvents && sortedEvents.length > 0 ? (
                <section>
                {sortedEvents.map((event, index) => (
                  <div key={index}>
                    <h3>{event.name}</h3>
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                    <p>{event.location}</p>
                    <p>{event.category}</p>
                  </div>
                ))}
              </section>
            ) : (
              <p>There are no events yet.</p>
            )}
            </section>
        </>
    )
};

export default EventOverview;