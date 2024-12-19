import { Competition } from '@types';

const getAllCompetitions = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch competitions');
    }
    return response.json();
};

const getCompetitionById = async (id: number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch competition with ID: ${id}`);
    }
    return response.json();
};
const getCompetitionByName = async (name: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/name/${name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error(`Competition with name "${name}" not found.`);
        }
        throw new Error('Failed to fetch competition by name');
    }
    return response.json();
};

// Create a new competition
const createCompetition = async (competition: Competition) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(competition),
    });
    if (!response.ok) {
        throw new Error('Failed to create competition');
    }
    return response.json();
};

const CompetitionService = {
    getAllCompetitions,
    getCompetitionById,
    getCompetitionByName,
    createCompetition,
};

export default CompetitionService;
