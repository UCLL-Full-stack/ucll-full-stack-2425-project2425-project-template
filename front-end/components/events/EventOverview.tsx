import { Event } from "@types";

type Props = {
    events: Event[];
};

const EventOverview: React.FC<Prop> = ({events}: Props) => {
    return (
        <>
            <section>
            {events && events.length > 0 ? (
                <table>
                <thead>
                  <tr>
                    <th scope="col">Event name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date</th>
                    <th scope="col">Location</th>
                    <th scope="col">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>{event.name}</td>
                      <td>{event.description}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.location}</td>
                      <td>{event.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>There are no events yet.</p>
            )}
            </section>
        </>
    )
};

export default EventOverview;