import { Team } from '@types';

const getAllTeams = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const createTeam = async (team: Team) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    });
};

const fetchTeamsByCompetition = async (competitionId: number) => {
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/competition/${competitionId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

const TeamService = {
    getAllTeams,
    fetchTeamsByCompetition,
    createTeam,
};

export default TeamService;
