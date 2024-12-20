import { TempRace } from "@types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const addTempRace = async (tempRaceInput: TempRace) => {
  return fetch(`${apiUrl}/races/temp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tempRaceInput),
  });
};

const raceService = {
  addTempRace,
};

export default raceService;