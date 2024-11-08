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
};

const addParticipantToEvent = async (email: string, eventId: string) => {
  const response = await fetch(apiUrl + `/events/${eventId}/${email}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add participant to event');
  }

  return response.json();
};

const getEventsByUserEmail = async (email: string) => {
  const response = await fetch(apiUrl + `/users/${email}`, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    }
  });

  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to retrieve events for this user.');
  }

  return response.json();
};

const EventService = {
  getAll,
  getEventById,
  addParticipantToEvent,
  getEventsByUserEmail,
}

export default EventService;