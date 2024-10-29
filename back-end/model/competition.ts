import Team from './team';

class Competition {
    private id?: number;
    private name: string;
    private teams: Team[];

    constructor(competitionData: {
        id?: number;
        name: string;
        teams: Team[];
    }) {
        this.id = competitionData.id;
        this.name = competitionData.name;
        this.teams = competitionData.teams;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getTeams(): Team[] {
        return this.teams;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public equals(competition: Competition): boolean {
        return (
            this.id === competition.getId() &&
            this.name === competition.getName() &&
            this.teams === competition.getTeams()
        );
    }
}

export default Competition;