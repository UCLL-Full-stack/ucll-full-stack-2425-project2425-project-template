import { Event } from "@/types";

type Prop = {
  events: Array<Event>;
};

const EventOverview: React.FC<Prop> = ({ events }: Prop) => {
  console.log(events);
  return events && <></>;
};
export default EventOverview;
