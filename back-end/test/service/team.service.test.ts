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

test('givenValidTeamInput_whenCreatingTeam_thenTeamIsCreatedSuccessfully', () => {
    // given
    const teamInput = {
        teamName: validTeamName,
        players: [validPlayer, validPlayer2],
        coach: validCoach,
    };
    const team = new Team(teamInput);

    // when
    mockCreateTeam.mockReturnValue(team);
    const createdTeam = teamService.createTeam(teamInput);

    // then
    expect(createdTeam).toEqual(team);
});

test('givenExistingTeamName_whenCreatingTeam_thenErrorIsThrown', () => {
    // given
    const teamInput = {
        teamName: validTeamName,
        players: [validPlayer, validPlayer2],
        coach: validCoach,
    };

    // when
    const existingTeam = new Team(teamInput);
    mockGetAllTeams.mockReturnValue([existingTeam]);

    // then
    expect(() => teamService.createTeam(teamInput)).toThrow('Team with that name already exists.');
});

test('givenValidCoachId_whenGettingTeamsByCoach_thenTeamsWithThatCoachAreReturned', () => {
    // given
    const team = new Team({
        id: validId,
        teamName: validTeamName,
        players: [validPlayer],
        coach: validCoach,
    });
    mockGetTeamsByCoach.mockReturnValue([team]);

    // when
    const teams = teamService.getTeamsByCoach(validId);

    // then
    expect(teams).toContain(team);
});

test('givenInvalidCoachId_whenGettingTeamsByCoach_thenErrorIsThrown', () => {
    // given
    mockGetTeamsByCoach.mockReturnValue(undefined);

    // when & then
    expect(() => teamService.getTeamsByCoach(invalidId)).toThrow(
        `Coach with id ${invalidId} does not exist.`
    );
});

test('givenTeamWithValidId_whenGettingTeamById_thenTeamWithThatIdIsReturnedSuccessfully', () => {
    // given
    const team = new Team({
        id: validId,
        teamName: validTeamName,
        players: [validPlayer],
        coach: validCoach,
    });
    mockGetTeamById.mockReturnValue(team);

    // when
    const validTeam = teamDb.getTeamById(validId);

    // then
    expect(validTeam).toEqual(team);
    expect(validTeam).not.toBeUndefined();
});

test('givenTeamWithInvalidId_whenGettingTeamById_thenErrorIsThrown', () => {
    // given
    mockGetTeamById.mockReturnValue(undefined);

    // when & then
    expect(() => teamService.getTeamById(invalidId)).toThrow(
        `Team with id ${invalidId} does not exist.`
    );
});

test('givenNoPlayers_whenCreatingTeam_thenErrorIsThrown', () => {
    // given
    const teamInput = {
        teamName: validTeamName,
        players: [],
        coach: validCoach,
    };

    // when & then
    expect(() => teamService.createTeam(teamInput)).toThrow('Team must have at least one player.');
});