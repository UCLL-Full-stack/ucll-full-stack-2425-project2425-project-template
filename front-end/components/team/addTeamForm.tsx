import TeamService from '@services/TeamsService';
import { Team, User } from '@types';
import { useEffect, useState } from 'react';

const addTeamForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [points, setPoints] = useState<number>(0);
    const [owner, setOwner] = useState<User | null>(null);
    const [competition, setCompetition] = useState<number>(0);
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const createTeam = async (newTeam: Team) => {
        try {
            const response = await TeamService.createTeam(newTeam);
            if (!response.ok) {
                throw new Error('Failed to add a new Team');
            }
            const createdTeam = await response.json();
            console.log(createTeam);
        } catch (error) {
            console.log('error adding team');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newTeam: Team = {
            name,
            points,
            // owner,
            // competitionId,
        };
    };
    return null;
};

export default addTeamForm;
