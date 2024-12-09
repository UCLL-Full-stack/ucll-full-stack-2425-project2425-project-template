// import { Team } from '../model/team';
// import User from '../model/User';
// import { TeamInput } from '../types';

// const members = [
//     new User({ userId: 1, username: 'user1', password: 'password1', role: 'Player', attendance: 0 }),
//     new User({ userId: 2, username: 'user2', password: 'password2', role: 'Player', attendance: 0 }),
//     new User({ userId: 3, username: 'user3', password: 'password3', role: 'Player', attendance: 0 }),
//     new User({ userId: 4, username: 'user4', password: 'password4', role: 'Player', attendance: 0 }),
//     new User({ userId: 5, username: 'user5', password: 'password5', role: 'Player', attendance: 0 }),
//     new User({ userId: 6, username: 'user6', password: 'password6', role: 'Player', attendance: 0 }),
// ];

// const coach = new User({ userId: 7, username: 'coach1', password: 'password1', role: 'Coach', attendance: 0 });

// const teams = [
//     new Team({ teamId: 1, members: members, coach: coach }),
// ];

// const addTeam = ({ teamId, members, coach }: TeamInput): Team => {
//     const team = new Team({
//         teamId,
//         members,
//         coach,
//     });
//     teams.push(team);
//     return team;
// };

// const getAllTeams = (): Team[] => {
//     return teams;
// };

// const getTeamById = (teamId: number): Team | undefined => {
//     return teams.find((team) => team.getId() === teamId);
// };

// export default { addTeam, getAllTeams, getTeamById };