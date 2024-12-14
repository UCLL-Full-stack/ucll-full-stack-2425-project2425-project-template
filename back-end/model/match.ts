export class Match {
    readonly id: number;
    readonly location: string;
    readonly date: Date;
    readonly homeTeam: string;
    readonly awayTeam: string;
    readonly homeScore: number;
    readonly awayScore: number;

    constructor(match: {id: number, location: string, date: Date, homeTeam: string, awayTeam: string, homeScore: number, awayScore: number}) {
        this.id = match.id;
        this.location = match.location;
        this.date = match.date;
        this.homeTeam = match.homeTeam;
        this.awayTeam = match.awayTeam;
        this.homeScore = match.homeScore;
        this.awayScore = match.awayScore;
    }

    getId(): number {
        return this.id;
    }

    getLocation(): string {
        return this.location;
    }

    getDate(): Date {
        return this.date;
    }

    getHomeTeam(): string {
        return this.homeTeam;
    }

    getAwayTeam(): string {
        return this.awayTeam;
    }

    getHomeScore(): number {
        return this.homeScore;
    }

    getAwayScore(): number {
        return this.awayScore;
    }

    getWinner(): string {
        if (this.homeScore > this.awayScore) {
            return this.homeTeam;
        } else if (this.awayScore > this.homeScore) {
            return this.awayTeam;
        } else {
            return "Draw";
        }
    }

    
}