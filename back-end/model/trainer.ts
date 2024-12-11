import {User} from './user'
import {Pokemon} from './pokemon'
import {Badge} from './badge'
import {GymBattle} from './gymBattle'

import {
    Trainer as TrainerPrisma,
    Badge as BadgePrisma,
    GymBattle as GymBattlePrisma,
    Pokemon as PokemonPrisma,
    Stats as StatsPrisma,
    User as UserPrisma,
 } from '@prisma/client'

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

    equals(trainer: Trainer): boolean {
        return (
            this.id === trainer.getId() &&
            this.user.equals(trainer.getUser()) &&
            this.pokemon.length === trainer.getPokemon().length &&
            this.pokemon.every((course, index) => course.equals(trainer.getPokemon()[index])) &&
            this.badges.length === trainer.getBadges().length &&
            this.badges.every((badge, index) => badge.equals(trainer.getBadges()[index])) &&
            this.gymBattles.length === trainer.getGymBattles().length &&
            this.gymBattles.every((battle, index) => battle.equals(trainer.getGymBattles()[index]))
        );
    }

    static from({
        id,
        user,
        pokemon,
        badge,
        gymBattle,
      }: TrainerPrisma & { user: UserPrisma; pokemon: (PokemonPrisma & { stats: StatsPrisma })[]; badge: BadgePrisma[]; gymBattle: GymBattlePrisma[] }) {
        return new Trainer({
          id,
          user: User.from(user),
          pokemon: pokemon.map((pokemonData) => {
            return Pokemon.from(pokemonData, pokemonData.stats);
          }),
          badges: badge.map((badge) => Badge.from(badge)),
          gymBattles: gymBattle.map((gymBattleData) => {
            return GymBattle.from({
              ...gymBattleData,
              badge: badge.find((badge) => badge.id === gymBattleData.badgeId) || {} as BadgePrisma, 
            });
          }),
        });
      }



    public addPokemon(pokemon: Pokemon): void {
        this.pokemon.push(pokemon); 
    }



}