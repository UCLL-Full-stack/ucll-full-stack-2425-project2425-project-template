type CompetitionDTO = {
    id: number;
    name: string;
    teams: TeamDTO[];
};

type TeamDTO = {
    id: number;
    name: string;
};

export {
    CompetitionDTO,
    TeamDTO,
};