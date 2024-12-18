// import { Match } from '../model/match';
// import database from '../util/database';

// const createMatch = async ({
//     date,
//     scoreTeam1,
//     scoreTeam2,
//     competition,
//     team1,
//     team2,
// }: Match): Promise<Match> => {
//     try {
//         const matchPrisma = await database.match.create({
//             data: {
//                 date,
//                 scoreTeam1,
//                 scoreTeam2,
//                 competition: {
//                     connect: { id: competition.id },
//                 },
//                 team1: {
//                     connect: { id: team1.id },
//                 },
//                 team2: {
//                     connect: { id: team2.id },
//                 },
//             },
//             include: {
//                 competition: true,
//                 team1: true,
//                 team2: true,
//             },
//         });

//         return Match.from(matchPrisma);
//     } catch (error) {
//         throw new Error(`Failed to create match`);
//     }
// };
