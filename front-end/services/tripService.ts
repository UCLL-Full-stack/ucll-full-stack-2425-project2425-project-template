import { Trip } from "@/types";

const getAllTrips = async () => {
    const token = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')!).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/trips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
  };

  const getTripById = async (tripId: string, token: string) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/trips/${tripId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
};

  const createTrip = (trip: Trip) => {
    const token = localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')!).token : null;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/trips`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(trip),
    })
};
  const TripService = {
    getAllTrips,
    getTripById,
    createTrip
  };
  
  export default TripService;
  