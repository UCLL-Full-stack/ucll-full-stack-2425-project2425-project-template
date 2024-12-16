import { Competition } from '../model/competition';
import competitionDb from '../repository/competition.db';

const getAllCompetitions = (): Competition[] => {
    return competitionDb.getAllCompetitions();
};

const getCompetitionById = (id: number): Competition => {
    const competition = competitionDb.getCompetitionById({ id });
    if (!competition) throw new Error(`Competition with id ${id} does not exist.`);
    return competition;
};

export default { getAllCompetitions, getCompetitionById };
