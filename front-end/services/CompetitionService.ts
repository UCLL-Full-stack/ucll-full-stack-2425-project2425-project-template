import { Competition } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllCompetitions = async () => {
    try {
        const response = await fetch(`${API_URL}/competitions`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching competitions:', error);
        throw error;
    }
};

const getCompetitionById = async (id: number) => {
    try {
        const response = await fetch(`${API_URL}/competitions/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching competition:', error);
        throw error;
    }
};

const editCompetition = async (competition: Competition): Promise<Competition> => {
    try {
        const response = await fetch(`${API_URL}/competitions`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(competition),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error editing competition:', errorText);
            throw new Error('Network response was not ok');
        }

        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            try {
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Failed to parse JSON response:', error);
                throw new Error('Invalid JSON response');
            }
        } else {
            const text = await response.text();
            console.log('Received non-JSON response:', text);
            return text as unknown as Competition;
        }
    } catch (error) {
        console.error('Error editing competition:', error);
        throw error;
    }
};
const addCompetition = async (competition: Competition) => {
    try {
        const response = await fetch(`${API_URL}/competitions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(competition),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Competition added:', data);
        return data;
    } catch (error) {
        console.error('Error adding competition:', error);
        throw error;
    }
}

export default {
    getAllCompetitions,
    getCompetitionById,
    editCompetition,
    addCompetition,
};