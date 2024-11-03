const getAllRaces = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return fetch(apiUrl + "/races", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const getRaceById = async (id: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    return fetch(`${apiUrl}/races/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  
  const raceService = {
    getAllRaces,
    getRaceById,
  };
  
  export default raceService;