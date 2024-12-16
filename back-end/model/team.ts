import { User } from './user';
import { Team as TeamPrisma, Competition as CompetitionPrisma } from '@prisma/client';
import { Competition } from './competition';
import { CompetitionInput } from '../types';

export class Team {
    private id: number;
    private name: string;
    private points: number;

    private ownerId: number;

    private competition: Competition;

    constructor(team: {
        id: number,
        name: string,
        points: number,
        ownerId: number,
        competition: Competition
    }) {
        this.id = team.id;
        this.name = team.name;
        this.points = team.points;
        this.ownerId = team.ownerId;
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

    getOwnerId(): number {
        return this.ownerId;
    }

    equals(team: Team): boolean {
        return (
            this.id === team.getId() &&
            this.name === team.getName() &&
            this.points === team.getPoints() &&
            this.ownerId === team.getOwnerId()
        );
    }

    static from({
        id,
        name,
        points,
        userId,
        competition,
    }: TeamPrisma & {competition: CompetitionPrisma}) {    
        return new Team({
            id,
            name,
            points,
            ownerId : userId,
            competition: Competition.from(competition),
        })
    }
}
