import EventService from "@/services/EventService";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const editEventPage: React.FC = () => {
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const fetchUser = async () => {
    const result = sessionStorage.getItem("loggedInUser");
    if (result) {
      setLoggedInUser(JSON.parse(result));
    }
  };

  const fetchEvent = async () => {
    console.log(Number(router.query.id));
    const { id } = router.query;
    console.log(Number(id));
    const response = await EventService.getEventById(Number(id));
    setEvent(response);
  };

  useEffect(() => {
    fetchEvent();
    fetchUser();
  }, [router.query.id]);

  return <></>;
};
export default editEventPage;
