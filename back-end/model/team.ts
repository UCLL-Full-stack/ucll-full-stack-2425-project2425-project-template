import { User } from './user';
import { Competition } from './competition';
import { CompetitionInput } from '../types';

export class Team {
    private id?: number;
    private name: string;
    private points: number;
    private owner: User;
    private competitionId: number;

    constructor(team: {
        id?: number;
        name: string;
        points: number;
        owner: User;
        competitionId: number;
    }) {
        this.id = team.id;
        this.name = team.name;
        this.points = team.points;
        this.owner = team.owner;
        this.competitionId = team.competitionId;
    }

    public getCompetition(): number {
        return this.competitionId;
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

    equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.points === team.getPoints() &&
            this.owner.equals(team.getOwner()) &&
            this.competitionId === team.getCompetition()
        );
    }
}
