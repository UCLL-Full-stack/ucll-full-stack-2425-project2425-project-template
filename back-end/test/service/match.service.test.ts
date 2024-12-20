// import { Match } from "../../model/match";
// import matchDb from "../../repository/match.db";
// import matchService from "../../service/match.service";

// jest.mock('../repository/match.db');

// let mockMatchDbGetAllMatches;
// let mockMatchDbGetMatchById: jest.Mock<any, any, any>;
// let mockMatchDbCreateMatch: jest.Mock<any, any, any>;

// beforeEach(() => {
//     mockMatchDbGetAllMatches = jest.fn();
//     mockMatchDbGetMatchById = jest.fn();
//     mockMatchDbCreateMatch = jest.fn();

//     matchDb.getAllMatches = mockMatchDbGetAllMatches;
//     matchDb.getMatchById = mockMatchDbGetMatchById;
//     matchDb.createMatch = mockMatchDbCreateMatch;
// });

// afterEach(() => {
//     jest.clearAllMocks();
// });

// test('given valid data, when match is created, then match is created with those values', async () => {
//     // given
//     const date = new Date();
//     const competition = { 
//         id: 1, 
//         name: 'Championship', 
//         matchesPlayed: 10, 
//         getId: () => 1, 
//         getName: () => 'Championship', 
//         getMatchesPlayed: () => 10, 
//         equals: (other: any) => other.id === 1 
//     };
//     const team1 = { 
//         id: 1, 
//         name: 'Team A', 
//         points: 0, 
//         userId: 1, 
//         competition: competition, 
//         getId: () => 1, 
//         getName: () => 'Team A', 
//         getPoints: () => 0, 
//         getUserId: () => 1, 
//         getCompetition: () => competition,
//         getuserId: () => 1,
//         equals: (other: any) => other.id === 1
//     };
//     const team2 = { 
//         id: 2, 
//         name: 'Team B', 
//         points: 0, 
//         userId: 2, 
//         competition: competition, 
//         getId: () => 2, 
//         getName: () => 'Team B', 
//         getPoints: () => 0, 
//         getUserId: () => 2, 
//         getCompetition: () => competition,
//         getuserId: () => 2,
//         equals: (other: any) => other.id === 2
//     };
//     const scoreTeam1 = 3;
//     const scoreTeam2 = 1;

//     const match = new Match({ date, competition, team1, team2, scoreTeam1, scoreTeam2 });

//     mockMatchDbCreateMatch.mockResolvedValue(match);

//     // when
//     const matchData = {
//         date,
//         competition,
//         team1,
//         team2,
//         scoreTeam1,
//         scoreTeam2,
//     };
//     const createdMatch = await matchService.createMatch(new Match(matchData));

//     // then
//     expect(mockMatchDbCreateMatch).toHaveBeenCalledTimes(1);
//     expect(mockMatchDbCreateMatch).toHaveBeenCalledWith(match);
//     expect(createdMatch).toEqual(match);
// });

// test('given missing competition, when match is created, then an error is thrown', async () => {
//     // given
//     const date = new Date();
//     const team1 = { 
//         id: 1, 
//         name: 'Team A', 
//         points: 0, 
//         userId: 1, 
//         competition: { 
//             id: 1, 
//             name: 'Championship', 
//             matchesPlayed: 10, 
//             getId: () => 1, 
//             getName: () => 'Championship', 
//             getMatchesPlayed: () => 10, 
//             equals: (other: any) => other.id === 1 
//         }, 
//         getId: () => 1, 
//         getName: () => 'Team A', 
//         getPoints: () => 0, 
//         getUserId: () => 1, 
//         getCompetition: () => ({ id: 1, name: 'Championship' }),
//         getuserId: () => 1,
//         equals: (other: any) => other.id === 1
//     };
//     const team2 = { 
//         id: 2, 
//         name: 'Team B', 
//         points: 0, 
//         userId: 2, 
//         competition: { 
//             id: 1, 
//             name: 'Championship', 
//             matchesPlayed: 10, 
//             getId: () => 1, 
//             getName: () => 'Championship', 
//             getMatchesPlayed: () => 10, 
//             equals: (other: any) => other.id === 1 
//         }, 
//         getId: () => 2, 
//         getName: () => 'Team B', 
//         getPoints: () => 0, 
//         getUserId: () => 2, 
//         getCompetition: () => ({ id: 1, name: 'Championship' }),
//         getuserId: () => 2,
//         equals: (other: any) => other.id === 2
//     };
//     const scoreTeam1 = 3;
//     const scoreTeam2 = 1;

//     // when
//     const competition = { 
//         id: 1, 
//         name: 'Championship', 
//         matchesPlayed: 10, 
//         getId: () => 1, 
//         getName: () => 'Championship', 
//         getMatchesPlayed: () => 10, 
//         equals: (other: any) => other.id === 1 
//     };
//     const createMatch = async () =>
//         await matchService.createMatch(new Match({ date, competition, team1, team2, scoreTeam1, scoreTeam2 }));

//     // then
//     await expect(createMatch).rejects.toThrow('nothing');
// });

// test('given missing team1 ID, when match is created, then an error is thrown', async () => {
//     // given
//     const date = new Date();
//     const competition = { 
//         id: 1, 
//         name: 'Championship', 
//         matchesPlayed: 10, 
//         getId: () => 1, 
//         getName: () => 'Championship', 
//         getMatchesPlayed: () => 10, 
//         equals: (other: any) => other.id === 1 
//     };
//     const team1 = { 
//         id: 1, 
//         name: 'Team A', 
//         points: 0, 
//         userId: 1, 
//         competition: competition, 
//         getId: () => 1, 
//         getName: () => 'Team A', 
//         getPoints: () => 0, 
//         getUserId: () => 1, 
//         getCompetition: () => competition,
//         getuserId: () => 1,
//         equals: (other: any) => other.id === 1
//     };
//     const team2 = { 
//         id: 2, 
//         name: 'Team B', 
//         points: 0, 
//         userId: 2, 
//         competition: competition, 
//         getId: () => 2, 
//         getName: () => 'Team B', 
//         getPoints: () => 0, 
//         getUserId: () => 2, 
//         getCompetition: () => competition,
//         getuserId: () => 2,
//         equals: (other: any) => other.id === 2
//     };
//     const scoreTeam1 = 3;
//     const scoreTeam2 = 1;

//     // when
//     const createMatch = async () =>
//         await matchService.createMatch(new Match({ date, competition, team1, team2, scoreTeam1, scoreTeam2 }));

//     // then
//     await expect(createMatch).rejects.toThrow('nothing');
// });

// test('given valid ID, when getting match, then match is returned', async () => {
//     // given
//     const id = 1;
//     const date = new Date();
//     const competition = { 
//         id: 1, 
//         name: 'Championship', 
//         matchesPlayed: 10, 
//         getId: () => 1, 
//         getName: () => 'Championship', 
//         getMatchesPlayed: () => 10, 
//         equals: (other: any) => other.id === 1 
//     };
//     const team1 = { 
//         id: 1, 
//         name: 'Team A', 
//         points: 0, 
//         userId: 1, 
//         competition: competition, 
//         getId: () => 1, 
//         getName: () => 'Team A', 
//         getPoints: () => 0, 
//         getUserId: () => 1, 
//         getCompetition: () => competition,
//         getuserId: () => 1,
//         equals: (other: any) => other.id === 1
//     };
//     const team2 = { 
//         id: 2, 
//         name: 'Team B', 
//         points: 0, 
//         userId: 2, 
//         competition: competition, 
//         getId: () => 2, 
//         getName: () => 'Team B', 
//         getPoints: () => 0, 
//         getUserId: () => 2, 
//         getCompetition: () => competition,
//         getuserId: () => 2,
//         equals: (other: any) => other.id === 2
//     };
//     const scoreTeam1 = 3;
//     const scoreTeam2 = 1;

//     const match = new Match({ date, competition, team1, team2, scoreTeam1, scoreTeam2 });

//     mockMatchDbGetMatchById.mockResolvedValue(match);

//     // when
//     const foundMatch = await matchService.getMatchById(id);

//     // then
//     expect(mockMatchDbGetMatchById).toHaveBeenCalledTimes(1);
//     expect(mockMatchDbGetMatchById).toHaveBeenCalledWith({ id });
//     expect(foundMatch).toEqual(match);
// });

// test('given invalid ID, when getting match, then an error is thrown', async () => {
//     // given
//     const id = 999;
//     mockMatchDbGetMatchById.mockResolvedValue(null);

//     // when
//     const getMatch = async () => await matchService.getMatchById(id);

//     // then
//     await expect(getMatch).rejects.toThrow(`Competition with id ${id} does not exist.`);
// });