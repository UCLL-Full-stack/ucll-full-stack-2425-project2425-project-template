import { Coach } from '../../model/coach';
import { Player } from '../../model/player';
import { Team } from '../../model/team';
import teamDb from '../../repository/team.db';
import teamService from '../../service/team.service';

const validTeamName = 'UCLLTeam';
const validId = 1;
const invalidId = -1;

const validCoach = new Coach({
    id: validId,
    firstName: 'Mark',
    lastName: 'Theman',
    email: 'marktheman@ucll.be',
    phoneNumber: '0412345679',
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

let mockCreateTeam: jest.Mock;
let mockGetAllTeams: jest.Mock;
let mockGetTeamsByCoach: jest.Mock;
let mockGetTeamById: jest.Mock;

beforeEach(() => {
    mockCreateTeam = jest.fn();
    mockGetAllTeams = jest.fn();
    mockGetTeamsByCoach = jest.fn();
    mockGetTeamById = jest.fn();

    teamDb.createTeam = mockCreateTeam;
    teamDb.getAllTeams = mockGetAllTeams;
    teamDb.getTeamsByCoach = mockGetTeamsByCoach;
    teamDb.getTeamById = mockGetTeamById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenValidTeamId_whenUpdatingTeam_thenTeamIsUpdatedSuccessfully', async () => {
    // given
    const teamInput = {
        id: validId,
        teamName: validTeamName,
        players: [validPlayer, validPlayer2],
        coach: validCoach,
    };
    const updatedTeam = new Team(teamInput);

    // when
    mockGetTeamById.mockResolvedValue(updatedTeam);
    mockCreateTeam.mockResolvedValue(updatedTeam);
    const result = await teamService.updateTeam(teamInput);

    // then
    expect(result).toEqual(updatedTeam);
});

test('givenInvalidTeamId_whenUpdatingTeam_thenErrorIsThrown', async () => {
    // given
    const teamInput = {
        id: invalidId,
        teamName: validTeamName,
        players: [validPlayer, validPlayer2],
        coach: validCoach,
    };

    // when
    mockGetTeamById.mockReturnValue(undefined);

    // then
    await expect(teamService.updateTeam(teamInput)).rejects.toThrow('No team with that id exists.');
});

test('givenNoId_whenUpdatingTeam_thenErrorIsThrown', async () => {
    // given
    const teamInput = {
        teamName: validTeamName,
        players: [validPlayer, validPlayer2],
        coach: validCoach,
    };

    // when & then
    await expect(teamService.updateTeam(teamInput)).rejects.toThrow('An id is required.');
});

test('givenValidTeamId_whenGettingTeamById_thenTeamIsReturnedSuccessfully', async () => {
    // given
    const team = new Team({
        id: validId,
        teamName: validTeamName,
        players: [validPlayer],
        coach: validCoach,
    });
    mockGetTeamById.mockReturnValue(team);

    // when
    const result = await teamService.getTeamById(validId);

    // then
    expect(result).toEqual(team);
});

test('givenInvalidTeamId_whenGettingTeamById_thenErrorIsThrown', async () => {
    // given
    mockGetTeamById.mockReturnValue(undefined);

    // when & then
    await expect(teamService.getTeamById(invalidId)).rejects.toThrow(
        `Team with id ${invalidId} does not exist.`
    );
});

test('givenValidCoachId_whenGettingTeamsByCoach_thenTeamsAreReturnedSuccessfully', async () => {
    // given
    const team = new Team({
        id: validId,
        teamName: validTeamName,
        players: [validPlayer],
        coach: validCoach,
    });

    // when
    mockGetTeamsByCoach.mockResolvedValue([team]);
    const result = await teamService.getTeamsByCoach(validId);

    // then
    expect(result).toEqual([team]);
});

test('givenInvalidCoachId_whenGettingTeamsByCoach_thenErrorIsThrown', async () => {
    // given
    mockGetTeamsByCoach.mockReturnValue([]);

    // when & then
    await expect(teamService.getTeamsByCoach(invalidId)).rejects.toThrow(
        'No teams found for that coach.'
    );
});
