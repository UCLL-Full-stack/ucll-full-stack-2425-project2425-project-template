import { Match } from "@/types";

const API = process.env.NEXT_PUBLIC_API_URL;


const getAllMatches = async () => {
    //const token = JSON.parse(sessionStorage.getItem("token") || "")?.token;
    const response = await fetch(`${API}/matches`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) throw new Error("Failed to fetch matches.");
    return await response.json();
}

const addMatch = async (matchData: {location: string, date: Date, homeTeamName: string, awayTeamName: string, homeScore: number, awayScore: number}) => {
    const response = await fetch(`${API}/matches/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(matchData)
    });
    if (!response.ok) throw new Error("Failed to add match.");
    return await response.json();
}

const updateMatch = async (id: number, updatedMatch: {location: string, date: Date, homeTeamName: string, awayTeamName: string, homeScore: number, awayScore: number}) => {
    const response = await fetch(`${API}/matches/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMatch)
    });
    if (!response.ok) throw new Error("Failed to update match.");
    return await response.json();
}


const deleteMatch = async (id: number) => {
    const response = await fetch(`${API}/matches/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (!response.ok) throw new Error("Failed to delete match.");
    const data = await response;
    return data;
}

const MatchService = {
    getAllMatches,
    addMatch,
    updateMatch,
    deleteMatch
}

export default MatchService