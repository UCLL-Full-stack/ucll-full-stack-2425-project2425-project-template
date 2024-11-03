import Competition from "../model/competition";
import Team from "../model/team";

const competitions = [
    new Competition({
        id: 1,
        name: "NBA",
        teams: [
            new Team({
                id: 1,
                name: "Los Angeles Lakers"
            }),
            new Team({
                id: 2,
                name: "Golden State Warriors"
            }),
        ]
    }),
    new Competition({
        id: 2,
        name: "BNXT League",
        teams: [
            new Team({
                id: 3,
                name: "Leuven Bears"
            }),
            new Team({
                id: 4,
                name: "Antwerp Giants"
            }),
        ]
    }),
];

const getAllCompetitions = (): Competition[] => {
    return competitions;
}

const createCompetition = (competition: Competition): Competition => {
    competitions.push(competition);
    return competition;
}

const editCompetition = (competitionId: number, competition: Competition): Competition => {
    const index = competitions.findIndex(c => c.getId() === competitionId);
    if (index >= 0) {
        competitions[index] = competition;
    }
    return competition;
}

export default {
    getAllCompetitions,
    createCompetition,
    editCompetition,
}