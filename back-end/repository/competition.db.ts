import { Competition } from '../model/competition';
import { Team } from '../model/team';

export const competitions = [
    new Competition({ id: 1, name: 'Belgian Amateur League', matchesPlayed: 0, teams: [] }),
    new Competition({ id: 2, name: 'Belgian Pro League', matchesPlayed: 0, teams: [] }),
    new Competition({ id: 3, name: 'Belgian Super League', matchesPlayed: 0, teams: [] }),
];

const getAllCompetitions = (): Competition[] => {
    return competitions;
};

const getCompetitionById = ({ id }: { id: number }): Competition | null => {
    return competitions.find((competition) => competition.getId() === id) || null;
};

export default {
    getAllCompetitions,
    getCompetitionById,
};
