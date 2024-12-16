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

export default {
    getAllPlayers,
};