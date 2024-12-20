const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getCrashById = async (id: number) => {
  return fetch(`${apiUrl}/crashes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getAllCrashes = async () => {
  return fetch(`${apiUrl}/crashes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getCrashByRaceId = async (id: number) => {
  return fetch(`${apiUrl}/races/crash/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const crashService = {
  getCrashById,
  getAllCrashes,
  getCrashByRaceId,
};

export default crashService;