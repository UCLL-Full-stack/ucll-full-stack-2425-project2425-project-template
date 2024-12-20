import { Crash } from "@types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllRaces = async () => {
  return fetch(apiUrl + "/races", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getRaceById = async (id: string) => {
  return fetch(`${apiUrl}/races/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addCrashToRace = async (raceId: number, crashInput: Crash) => {
  return fetch(`${apiUrl}/races/${raceId}/crashes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(crashInput),
  });
};

const editCrash = async (crashId: number, crashInput: Crash) => {
  return fetch(`${apiUrl}/races/crashes/${crashId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(crashInput),
  });
};

const removeCrashFromRace = async (raceId: number, crashId: number) => {
  return fetch(`${apiUrl}/races/${raceId}/crashes/${crashId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getRaceByName = async (name: string) => {
  return fetch(`${apiUrl}/races/name/${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const raceService = {
  getAllRaces,
  getRaceById,
  addCrashToRace,
  editCrash,
  removeCrashFromRace,
  getRaceByName,
};

export default raceService;