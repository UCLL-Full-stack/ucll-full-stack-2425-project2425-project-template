import Competition from "../model/competition";
import Team from "../model/team";

const competitions = [
    new Competition({
        id: 1,
        name: "La Liga",
        teams: [
            new Team({
                id: 1,
                name: "Real Madrid"
            }),
            new Team({
                id: 2,
                name: "Barcelona"
            }),
        ]
    }),
    new Competition({
        id: 2,
        name: "Premier League",
        teams: [
            new Team({
                id: 3,
                name: "Manchester United"
            }),
            new Team({
                id: 4,
                name: "Manchester City"
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