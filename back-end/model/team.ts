class Team {
    private id: number | undefined;
    private name: string;
    private points: number;

    constructor(teamData: {
        id?: number;
        name: string;
    }) {
        this.id = teamData.id;
        this.name = teamData.name;
        this.points = 0; // Points start at 0
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPoints(): number {
        return this.points;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setPoints(points: number): void {
        this.points = points;
    }

    public equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.points === team.getPoints()
        );
    }
}

export default Team;