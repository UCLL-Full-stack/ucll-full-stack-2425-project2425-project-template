import { Team } from '@types';

const getAllTeams = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch teams');
    }
    return response.json();
};

const getTeamById = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch team with ID: ${id}`);
    }
    return response.json();
};

const getTeamsByCompetition = async (competitionId: number) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/teams/competition/${competitionId}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch teams for competition ID: ${competitionId}`);
    }
    return response.json();
};

const createTeam = async (team: Team) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teams`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    });

    if (!response.ok) {
        throw new Error(`Failed to create team: ${response.statusText}`);
    }
    return response.json();
};

const TeamService = {
    getAllTeams,
    createTeam,
    getTeamById,
    getTeamsByCompetition,
};

export default TeamService;
