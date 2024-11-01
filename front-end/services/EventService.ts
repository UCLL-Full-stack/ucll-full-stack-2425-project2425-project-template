const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAll = () => {
  return fetch(apiUrl + "/events", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

const getEventById = (eventId: string) => {
  return fetch(apiUrl + `/events/${eventId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });
}

const EventService = {
  getAll,
  getEventById,
}

export default EventService;