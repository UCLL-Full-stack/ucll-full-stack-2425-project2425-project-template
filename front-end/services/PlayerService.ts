import { Player } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAllPlayers = async () => {
    try {
        const response = await fetch(`${API_URL}/players`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching players:', error);
        throw error;
    }
};

const addPlayer = async (player: Player): Promise<Player> => {
    try {
        const response = await fetch(`${API_URL}/players`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(player),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error adding player:', errorText);
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
            throw new Error('Invalid response type');
        }
    } catch (error) {
        console.error('Error adding player:', error);
        throw error;
    }
}

const PlayerService = {
    getAllPlayers,
    addPlayer,
};

export default PlayerService;