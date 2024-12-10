import { set } from 'date-fns';
import { Coach } from '../../model/coach';
import { Game } from '../../model/game';
import { Player } from '../../model/player';
import { Team } from '../../model/team';
import gameService from '../../service/game.service';
import gameDb from '../../repository/game.db';

// Valid test data
const validDate = set(new Date(), { hours: 15, minutes: 30 });
const validResult = '0 - 1';
const validId = 1;
const invalidId = -1;

const validCoach = new Coach({
    id: validId,
    firstName: 'Mark',
    lastName: 'Theman',
    email: 'marktheman@ucll.be',
    phoneNumber: '0412345679',
});

const validCoach2 = new Coach({
    id: 2,
    firstName: 'Sarah',
    lastName: 'Smith',
    email: 'sarahsmith@ucll.be',
    phoneNumber: '0498764565',
});

const validPlayer = new Player({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@ucll.be',
    phoneNumber: '0412345678',
});

const validPlayer2 = new Player({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'janedoe@ucll.be',
    phoneNumber: '0498765445',
});

const validTeam = new Team({
    teamName: 'UCLLTeam',
    players: [validPlayer, validPlayer2],
    coach: validCoach,
});

const validTeam2 = new Team({
    teamName: 'UCLLTeam2',
    players: [validPlayer, validPlayer2],
    coach: validCoach2,
});

// Mocks
let mockCreateGame: jest.Mock;
let mockGetAllGames: jest.Mock;
let mockGetGameById: jest.Mock;

beforeEach(() => {
    mockCreateGame = jest.fn();
    mockGetAllGames = jest.fn();
    mockGetGameById = jest.fn();

    gameDb.getAllGames = mockGetAllGames;
    gameDb.getGameById = mockGetGameById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenNoGames_whenGetAllGames_thenEmptyArrayIsReturned', async () => {
    // given
    mockGetAllGames.mockReturnValue([]);

    // when
    const allGames = await gameService.getAllGames();

    // then
    expect(allGames).toEqual([]);
});

test('givenGameWithInvalidId_whenGettingGameById_thenErrorIsThrown', async () => {
    // given
    mockGetGameById.mockReturnValue(undefined);

    // when & then
    await expect(gameService.getGameById(invalidId)).rejects.toThrow(
        `Game with id ${invalidId} does not exist.`
    );
});

test('givenValidGameInput_whenCreatingGame_thenGameIsCreatedSuccessfully', async () => {
    // given
    const gameInput = { date: validDate, teams: [validTeam, validTeam2] };
    const game = new Game({ date: validDate, teams: [validTeam, validTeam2] });

    // when
    mockCreateGame.mockReturnValue(game);
    const createdGame = await gameService.createGame(gameInput);

    // then
    expect(createdGame).toEqual(game);
});

test('givenExistingGameId_whenCreatingGame_thenErrorIsThrown', async () => {
    // given
    const gameInput = { id: validId, date: validDate, teams: [validTeam, validTeam2] };

    // when
    const existingGame = new Game(gameInput);
    mockGetAllGames.mockReturnValue([existingGame]);

    // then
    await expect(gameService.createGame(gameInput)).rejects.toThrow(
        `Game with id ${validId} already exists.`
    );
});

test('givenInvalidDate_whenCreatingGame_thenErrorIsThrown', async () => {
    // given
    const invalidDate = new Date(NaN);
    const gameInput = { date: invalidDate, teams: [validTeam, validTeam2] };

    // when & then
    await expect(gameService.createGame(gameInput)).rejects.toThrow('Date is required.');
});

test('givenGameInputWithLessThenTwoTeams_whenCreatingGame_thenErrorIsThrown', async () => {
    // given
    const gameInput = { date: validDate, teams: [] };

    // when & then
    await expect(gameService.createGame(gameInput)).rejects.toThrow(
        'Exactly two teams are required.'
    );
});

test('givenGameInputWithMoreThanTwoTeams_whenCreatingGame_thenErrorIsThrown', async () => {
    // given
    const gameInput = { date: validDate, teams: [validTeam, validTeam2, validTeam] };

    // when & then
    await expect(gameService.createGame(gameInput)).rejects.toThrow(
        'Exactly two teams are required.'
    );
});
