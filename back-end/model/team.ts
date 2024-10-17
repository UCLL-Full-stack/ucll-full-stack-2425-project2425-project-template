import { User } from './user';
import { Competition } from './competition';

export class Team {
    private id?: number;
    private name: string;
    private points: number;
    private owner: User;
    private competition: Competition;

    constructor(team: {
        id?: number;
        name: string;
        points: number;
        owner: User;
        competition: Competition;
    }) {
        this.id = team.id;
        this.name = team.name;
        this.points = team.points;
        this.owner = team.owner;
        this.competition = team.competition;
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPoints(): number {
        return this.points;
    }

    getOwner(): User {
        return this.owner;
    }

    getCompetition(): Competition {
        return this.competition;
    }

    equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.points === team.getPoints() &&
            this.owner.equals(team.getOwner()) &&
            this.competition.equals(team.getCompetition())
        );
    }
}
