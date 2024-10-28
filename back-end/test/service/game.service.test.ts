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

test('givenAllGames_whenGetAllGames_thenAllGamesAreReturned', () => {
    // given
    const allGames = new Game({ date: validDate, teams: [validTeam, validTeam2] });
    

    // when
    mockGetAllGames.mockReturnValue(allGames);

    // then
    expect(gameService.getAllGames()).toEqual(allGames);
});

test('givenGames_whenGetGameById_thenReturnGameWithId', () => {
    // given
    const game = new Game({ id: validId, date: validDate, teams: [validTeam, validTeam2] });
    mockGetGameById.mockReturnValue(game);

    // when
    const gameWithId = gameService.getGameById(validId);

    // then
    expect(gameWithId).toEqual(game);
    expect(gameWithId).not.toBeUndefined();
});

test('givenGameWithInvalidId_whenGettingGameById_thenErrorIsThrown', () => {
    // given
    mockGetGameById.mockReturnValue(undefined);

    // when & then
    expect(() => gameService.getGameById(invalidId)).toThrow(`Game with id ${invalidId} does not exist.`);
});

test('givenValidGameInput_whenCreatingGame_thenGameIsCreatedSuccessfully', () => {
    // given
    const gameInput = { date: validDate, teams: [validTeam, validTeam2] };
    const game = new Game({ date: validDate, teams: [validTeam, validTeam2] });
    

    // when
    mockCreateGame.mockReturnValue(game);
    const createdGame = gameService.createGame(gameInput);

    // then
    expect(createdGame).toEqual(game);
});

test('givenExistingGameId_whenCreatingGame_thenErrorIsThrown', () => {
    // given
    const gameInput = { id: validId, date: validDate, teams: [validTeam, validTeam2] };

    // when
    const existingGame = new Game(gameInput);
    mockGetAllGames.mockReturnValue([existingGame]);

    // then
    expect(() => gameService.createGame(gameInput)).toThrow(`Game with id ${validId} already exists.`);
});

test('givenInvalidDate_whenCreatingGame_thenErrorIsThrown', () => {
    // given
    const invalidDate = new Date(NaN);
    const gameInput = { date: invalidDate, teams: [validTeam, validTeam2] };

    // when & then
    expect(() => gameService.createGame(gameInput)).toThrow('Date is required.');
});

test('givenGameInputWithLessThenTwoTeams_whenCreatingGame_thenErrorIsThrown', () => {
    // given
    const gameInput = { date: validDate, teams: [] };

    // when & then
    expect(() => gameService.createGame(gameInput)).toThrow('Exactly two teams are required.');
});
