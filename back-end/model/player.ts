import { Player as PlayerPrisma } from '@prisma/client';
import { User } from './user';
import Team from './team';

class Player {
    private id?: number;
    private number: number;
    private user: User;
    private team: Team;

    constructor(playerData: {
        id?: number;
        number: number;
        user: User;
        team: Team;
    }) {
        this.id = playerData.id;
        this.number = playerData.number;
        this.user = playerData.user;
        this.team = playerData.team;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getNumber(): number {
        return this.number;
    }

    public getUser(): User {
        return this.user;
    }

    public getTeam(): Team {
        return this.team;
    }

    public setNumber(number: number): void {
        this.number = number;
    }

    public setUser(user: User): void {
        this.user = user;
    }

    public setTeam(team: Team): void {
        this.team = team;
    }

    public equals(player: Player): boolean {
        return (
            this.id === player.getId() &&
            this.number === player.getNumber() &&
            this.user.equals(player.getUser()) &&
            this.team.equals(player.getTeam())
        );
    }

    static from(playerPrisma: PlayerPrisma, user: User, team: Team): Player {
        return new Player({
            id: playerPrisma.id,
            number: playerPrisma.number,
            user,
            team,
        });
    }
}

export default Player;