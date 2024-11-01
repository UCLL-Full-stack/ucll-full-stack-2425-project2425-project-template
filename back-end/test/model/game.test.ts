import { Game } from '../../model/game';
import { set } from 'date-fns';

const name: string = 'Heavenly Bodies';
const description: string =
    'Heavenly Bodies is a game about cosmonauts, the body, and the absence of gravity.';
const genre: string = 'Action, Adventure, Indie, Simulation';
const releaseDate: Date = set(new Date(), { date: 7, month: 12, year: 2021 });

test(`given: valid values for game, when: game is created, then: game is created with those values`, () => {
    // given

    // when
    const game = new Game({
        name,
        description,
        genre,
        releaseDate,
    });
    // then
    expect(game.getName()).toEqual(name);
    expect(game.getDescription()).toEqual(description);
    expect(game.getGenre()).toEqual(genre);
    expect(game.getReleaseDate()).toEqual(releaseDate);
});
