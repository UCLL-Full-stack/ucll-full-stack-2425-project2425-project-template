const getAllRaces = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return fetch(apiUrl + "/races", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

const raceService = {
    getAllRaces
}

export default raceService;