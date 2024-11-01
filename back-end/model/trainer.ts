import {User} from './user'
import {Pokemon} from './pokemon'
import {Badge} from './badge'
import {GymBattle} from './gymBattle'

export class Trainer {
    private id?: number;
    private user: User
    private pokemon: Pokemon[];
    private badges: Badge[];
    private gymBattles: GymBattle[];

    constructor(trainer: {
        id?: number,
        user: User,
        pokemon: Pokemon[],
        badges: Badge[],
        gymBattles: GymBattle[];
    })  {
        this.id = trainer.id;
        this.user = trainer.user;
        this.pokemon = trainer.pokemon;
        this.badges = trainer.badges;
        this.gymBattles = trainer.gymBattles;
    }

    getId(): undefined | number {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    getPokemon(): Pokemon[] {
        return this.pokemon;
    }

    getBadges(): Badge[] {
        return this.badges;
    }

    getGymBattles(): GymBattle[] {
        return this.gymBattles;
    }
}