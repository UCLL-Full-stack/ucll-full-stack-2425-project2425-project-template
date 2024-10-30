import { Event } from "@types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAll = () => {
  return fetch(apiUrl + "/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const EventService = {
  getAll,
}

export default EventService;