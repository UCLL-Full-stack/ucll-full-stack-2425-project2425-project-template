import { Event } from "@/types";

const getAllEvents = async () => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

const addEvent = async (event: Event) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
};

const getEventById = async (id: number) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/events/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
};

export default { getAllEvents, addEvent, getEventById };
