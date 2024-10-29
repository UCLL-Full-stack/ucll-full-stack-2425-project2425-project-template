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

export default {
    getAllCompetitions,
}