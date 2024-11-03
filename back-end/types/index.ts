type CompetitionInput = {
    id?: number;
    name: string;
    teams: TeamInput[];
};

type TeamInput = {
    id?: number;
    name: string;
};

export {
    CompetitionInput,
    TeamInput,
};