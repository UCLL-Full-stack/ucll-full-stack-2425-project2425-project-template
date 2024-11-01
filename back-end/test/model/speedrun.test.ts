import { set } from 'date-fns';
import { Category } from '../../model/category';
import { User } from '../../model/user';
import { Game } from '../../model/game';
import { Speedrun } from '../../model/speedrun';

const time: number = 1620000;
const submitDate: Date = set(new Date(), { date: 24, month: 10, year: 2024 });
const videoLink: string = 'https://www.example.com/lajksdf';
const category: Category = new Category({
    name: 'Any%',
    description: 'Complete the game with any percent of completion.',
    game: new Game({
        name: 'Heavenly Bodies',
        description:
            'Heavenly Bodies is a game about cosmonauts, the body, and the absence of gravity.',
        genre: 'Action, Adventure, Indie, Simulation',
        releaseDate: set(new Date(), { date: 7, month: 12, year: 2021 }),
    }),
});
const speedrunner: User = new User({
    username: 'speedy-gonzales',
    email: 'speedy.gonzales@email.com',
    password: 'password123',
    role: 'User',
    signUpDate: set(new Date(), { date: 29, month: 8, year: 1953 }),
});
const isValidated: boolean = false;
const validator: User = new User({
    username: 'walter',
    email: 'walt.disney@email.com',
    password: '1234password',
    role: 'Admin',
    signUpDate: set(new Date(), { date: 5, month: 12, year: 1901 }),
});
const game: Game = new Game({
    name: 'Heavenly Bodies',
    description:
        'Heavenly Bodies is a game about cosmonauts, the body, and the absence of gravity.',
    genre: 'Action, Adventure, Indie, Simulation',
    releaseDate: set(new Date(), { date: 7, month: 12, year: 2021 }),
});

test(`given: valid values for speedrun, when: speedrun is created, then: speedrun is created with those values`, () => {
    // given

    // when
    const speedrun = new Speedrun({
        time,
        submitDate,
        videoLink,
        category,
        speedrunner,
        isValidated,
        validator,
        game,
    });
    // then
    expect(speedrun.getTime()).toEqual(time);
    expect(speedrun.getSubmitDate()).toEqual(submitDate);
    expect(speedrun.getVideoLink()).toEqual(videoLink);
    expect(speedrun.getCategory()).toEqual(category);
    expect(speedrun.getSpeedrunner()).toEqual(speedrunner);
    expect(speedrun.getIsValidated()).toEqual(isValidated);
    expect(speedrun.getValidator()).toEqual(validator);
    expect(speedrun.getGame()).toEqual(game);
});

test(`given: valid values for speedrun and validator is undefined, when: speedrun is created, then: speedrun is created with those values`, () => {
    // given
    const undefinedValidator: User | undefined = undefined;
    // when
    const speedrun = new Speedrun({
        time,
        submitDate,
        videoLink,
        category,
        speedrunner,
        isValidated,
        validator: undefinedValidator,
        game,
    });
    // then
    expect(speedrun.getTime()).toEqual(time);
    expect(speedrun.getSubmitDate()).toEqual(submitDate);
    expect(speedrun.getVideoLink()).toEqual(videoLink);
    expect(speedrun.getCategory()).toEqual(category);
    expect(speedrun.getSpeedrunner()).toEqual(speedrunner);
    expect(speedrun.getIsValidated()).toEqual(isValidated);
    expect(speedrun.getValidator()).toEqual(undefinedValidator);
    expect(speedrun.getGame()).toEqual(game);
});
