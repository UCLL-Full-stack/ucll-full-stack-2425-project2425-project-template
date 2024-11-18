import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.game.deleteMany();
    await prisma.team.deleteMany();
    await prisma.coach.deleteMany();
    await prisma.player.deleteMany();

    const coach1 = await prisma.coach.create({
        data: {
            firstName: 'Test',
            lastName: 'Coach',
            email: 'testcoach@ucll.be',
            phoneNumber: '0497000000',
        }
    });

    const coach2 = await prisma.coach.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@ucll.be',
            phoneNumber: '0497000007',
        }
    });

    const player1 = await prisma.player.create({
        data: {
            firstName: 'Test',
            lastName: 'Player',
            email: 'testplayer@ucll.be',
            phoneNumber: '0497000001',
        }
    });

    const player2 = await prisma.player.create({
        data: {
            firstName: 'Cristiano',
            lastName: 'Ronaldo',
            email: 'cristianoronaldo@ucll.be',
            phoneNumber: '0497000002',
        }
    });

    const player3 = await prisma.player.create({
        data: {
            firstName: 'Lionel',
            lastName: 'Messi',
            email: 'lionelmessi@ucll.be',
            phoneNumber: '0497000003',
        }
    });

    const player4 = await prisma.player.create({
        data: {
            firstName: 'Rajo',
            lastName: 'Timmermans',
            email: 'rajotimmermans@ucll.be',
            phoneNumber: '0497000004',
        }
    });

    const player5 = await prisma.player.create({
        data: {
            firstName: 'Sander',
            lastName: 'Coemans',
            email: 'sandercoemans@ucll.be',
            phoneNumber: '0497000005',
        }
    });

    const player6 = await prisma.player.create({
        data: {
            firstName: 'Eden',
            lastName: 'Hazard',
            email: 'edenhazard@ucll.be',
            phoneNumber: '0497000006',
        }
    });

    const team1 = await prisma.team.create({
        data: {
            teamName: 'Test Team',
            coachId: coach1.id,
            players: {
                connect: [
                    { id: player1.id },
                    { id: player2.id },
                    { id: player3.id },
                ]
            }
        }
    });

    const team2 = await prisma.team.create({
        data: {
            teamName: 'Other Team',
            coachId: coach2.id,
            players: {
                connect: [
                    { id: player4.id },
                    { id: player5.id },
                    { id: player6.id },
                ]
            }
        }
    });

    const game1 = await prisma.game.create({
        data: {
            date: new Date(2024, 11, 17),
            result: '1-0',
            teams: {
                connect: [
                    { id: team1.id },
                    { id: team2.id },
                ]
            }
        }
    });
}

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();