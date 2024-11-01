import { Category } from '../../model/category';
import { Game } from '../../model/game';
import { set } from 'date-fns';

const name: string = 'Any%';
const description: string = 'Complete the game with any percent of completion.';
const game: Game = new Game({
    name: 'Heavenly Bodies',
    description:
        'Heavenly Bodies is a game about cosmonauts, the body, and the absence of gravity.',
    genre: 'Action, Adventure, Indie, Simulation',
    releaseDate: set(new Date(), { date: 7, month: 12, year: 2021 }),
});

test(`given: valid values for category, when: category is created, then: category is created with those values`, () => {
    // given

    // when
    const category = new Category({
        name,
        description,
        game,
    });
    // then
    expect(category.getName()).toEqual(name);
    expect(category.getDescription()).toEqual(description);
    expect(category.getGame()).toEqual(game);
});
