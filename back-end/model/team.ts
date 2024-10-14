import { Coach } from "./coach";
import { Player } from "./player";

export class Team {
    private id?: number;
    private teamName: string;
    private players: Player[];
    private coach: Coach;
    
    constructor(team: {id?: number, teamName: string, players: Player[], coach: Coach}) {
        this.teamName = team.teamName;
        this.players = team.players;
        this.coach = team.coach;
    }

    getId(): number | undefined { 
        return this.id
    }

    getTeamName(): string {
        return this.teamName;
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getCoach(): Coach {
        return this.coach;
    }

    equals(team: Team): boolean {
        return (
            this.teamName === team.teamName &&
            this.players.length === team.players.length &&
            this.players.every((player, index) => player.equals(team.players[index])) &&
            this.coach === team.coach
        );
    }

    addPlayer(player: Player) {
        if (!this.getPlayers().includes(player)) {
            this.players.push(player);
        }
    }

    removePlayer(player: Player) {
        if (this.getPlayers().includes(player)) {
            const index = this.players.indexOf(player);
            this.players.splice(index, 1);
        }
    }

    updateCoach(coach: Coach) {
        if (this.getCoach() != coach) {
            this.coach = coach;
        }
    }
}