import { Coach as CoachPrisma } from '@prisma/client';
import { User } from './user';
import Team from './team';

class Coach {
    private id?: number;
    private user: User;
    private team: Team;

    constructor(coachData: {
        id?: number;
        user: User;
        team: Team;
    }) {
        this.id = coachData.id;
        this.user = coachData.user;
        this.team = coachData.team;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getUser(): User {
        return this.user;
    }

    public getTeam(): Team {
        return this.team;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public setTeam(team: Team): void {
        this.team = team;
    }

    public equals(coach: Coach): boolean {
        return (
            this.id === coach.getId() &&
            this.user.equals(coach.getUser()) &&
            this.team.equals(coach.getTeam())
        );
    }

    static from(coachPrisma: CoachPrisma, user: User, team: Team): Coach {
        return new Coach({
            id: coachPrisma.id,
            user,
            team,
        });
    }
}

export default Coach;