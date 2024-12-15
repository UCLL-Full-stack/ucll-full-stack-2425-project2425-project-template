import { Trip } from "@/types";

const getAllTrips = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/trips", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
  };
  
  const getTripById = (tripId: string) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/trips/${tripId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  const createTrip = (trip: Trip) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/trips`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
  