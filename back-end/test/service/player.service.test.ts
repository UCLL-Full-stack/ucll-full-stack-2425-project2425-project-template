import { id } from 'date-fns/locale';
import { Player } from '../../model/player';
import playerDb from '../../repository/player.db';
import playerService from '../../service/player.service';
import { existsSync } from 'fs';

const validFirstName = 'John';
const invalidFirstName = '';
const validId = 1;
const invalidId = -1;
const validLastName = 'Doe';
const invalidLastName = '';
const validEmail = 'johndoe@ucll.be';
const invalidEmail = '';
const validPhoneNumber = '041234567';
const invalidPhoneNumber = '';

let mockGetAllPlayers: jest.Mock;
let mockGetPlayerById: jest.Mock;
let mockCreatePlayer: jest.Mock;

beforeEach(() => {
    mockGetAllPlayers = jest.fn();
    mockGetPlayerById = jest.fn();
    mockCreatePlayer = jest.fn();

    playerDb.getAllPlayers = mockGetAllPlayers;
    playerDb.getPlayerById = mockGetPlayerById;
    playerDb.createPlayer = mockCreatePlayer;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenNoPlayers_whenGettingAllPlayers_thenEmptyArrayIsReturned', async () => {
    // given
    mockGetAllPlayers.mockReturnValue([]);

    // when
    const allPlayers = await playerService.getAllPlayers();

    // then
    expect(allPlayers).toEqual([]);
});

test('givenValidPlayerId_whenGettingPlayerById_thenPlayerIsReturnedSuccessfully', async () => {
    // given
    const player = new Player({
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    });

    mockGetPlayerById.mockResolvedValue(player);

    // when
    const validPlayer = await playerService.getPlayerById(validId);

    // then
    expect(validPlayer).toEqual(player);
    expect(validPlayer).not.toBeUndefined();
});

test('givenInvalidPlayerId_whenGettingPlayerById_thenErrorIsThrown', async () => {
    // given
    mockGetPlayerById.mockResolvedValue(undefined);

    // when & then
    await expect(playerService.getPlayerById(invalidId)).rejects.toThrow(
        `Player with id ${invalidId} does not exist.`
    );
});

test('givenValidPlayerInput_whenCreatingPlayer_thenPlayerIsCreatedSuccessfully', async () => {
    // given
    const playerInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };
    const player = new Player({
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    });

    // when
    mockCreatePlayer.mockResolvedValue(player);
    const createdPlayer = await playerService.createPlayer(playerInput);

    // then
    expect(createdPlayer).toEqual(player);
});

test('givenInvalidId_whenCreatingPlayer_thenErrorIsThrown', async () => {
    // given
    const playerInput = {
        id: invalidId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(playerService.createPlayer(playerInput)).rejects.toThrow('Invalid id.');
});

test('givenExistingPlayerId_whenCreatingPlayer_thenErrorIsThrown', async () => {
    // given
    const playerInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when
    const existingPlayer = new Player(playerInput);
    mockGetAllPlayers.mockResolvedValue([existingPlayer]);

    // then
    await expect(playerService.createPlayer(playerInput)).rejects.toThrow(
        `Player with id ${validId} already exists.`
    );
});

test('givenInvalidFirstName_whenCreatingPlayer_thenErrorIsThrown', async () => {
    // given
    const playerInput = {
        id: validId,
        firstName: invalidFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(playerService.createPlayer(playerInput)).rejects.toThrow(
        'First name is required.'
    );
});

test('givenInvalidLastName_whenCreatingPlayer_thenErrorIsThrown', async () => {
    // given
    const playerInput = {
        id: validId,
        firstName: validFirstName,
        lastName: invalidLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(playerService.createPlayer(playerInput)).rejects.toThrow('Last name is required.');
});

test('givenInvalidEmail_whenCreatingPlayer_thenErrorIsThrown', async () => {
    // given
    const playerInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: invalidEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    await expect(playerService.createPlayer(playerInput)).rejects.toThrow('Email is required.');
});

test('givenInvalidPhoneNumber_whenCreatingPlayer_thenErrorIsThrown', async () => {
    // given
    const playerInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: invalidPhoneNumber,
    };

    // when & then
    await expect(playerService.createPlayer(playerInput)).rejects.toThrow(
        'Phone number is required.'
    );
});
