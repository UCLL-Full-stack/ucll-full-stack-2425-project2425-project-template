import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const prisma = new PrismaClient();

async function clearDatabase() {
    await prisma.coach.deleteMany();
    await prisma.player.deleteMany();
    await prisma.user.deleteMany();
    await prisma.team.deleteMany();
    await prisma.competition.deleteMany();
}

const main = async () => {
    await clearDatabase();

    const competitionNames = ["NBA", "EuroLeague", "NCAA", "WNBA", "FIBA"];
    const teamNames = [
        ["Los Angeles Lakers", "Golden State Warriors", "Chicago Bulls", "Boston Celtics", "Miami Heat"],
        ["Real Madrid", "CSKA Moscow", "Fenerbahce", "Olympiacos", "Barcelona"],
        ["Duke Blue Devils", "Kentucky Wildcats", "Kansas Jayhawks", "North Carolina Tar Heels", "UCLA Bruins"],
        ["Seattle Storm", "Las Vegas Aces", "Los Angeles Sparks", "Minnesota Lynx", "Phoenix Mercury"],
        ["Australia Boomers", "Spain National Team", "France National Team", "Argentina National Team", "USA National Team"]
    ];
    const playerNames = [
        ["LeBron James", "Stephen Curry", "Michael Jordan", "Larry Bird", "Dwyane Wade", "Kobe Bryant", "Shaquille O'Neal", "Magic Johnson", "Scottie Pippen", "Tim Duncan"],
        ["Luka Doncic", "Nando De Colo", "Jan Vesely", "Vassilis Spanoulis", "Nikola Mirotic", "Sergio Llull", "Rudy Fernandez", "Kyle Hines", "Shane Larkin", "Mike James"],
        ["Zion Williamson", "Anthony Davis", "Joel Embiid", "Jayson Tatum", "Kyrie Irving", "Kevin Durant", "Carmelo Anthony", "Chris Paul", "James Harden", "Russell Westbrook"],
        ["Sue Bird", "A'ja Wilson", "Candace Parker", "Maya Moore", "Diana Taurasi", "Breanna Stewart", "Elena Delle Donne", "Sylvia Fowles", "Brittney Griner", "Skylar Diggins-Smith"],
        ["Patty Mills", "Ricky Rubio", "Evan Fournier", "Luis Scola", "Kevin Durant", "Damian Lillard", "Jayson Tatum", "Bam Adebayo", "Jrue Holiday", "Devin Booker"]
    ];
    const coachNames = [
        ["Frank Vogel", "Steve Kerr", "Phil Jackson", "Brad Stevens", "Erik Spoelstra"],
        ["Pablo Laso", "Dimitris Itoudis", "Zeljko Obradovic", "Georgios Bartzokas", "Sarunas Jasikevicius"],
        ["Mike Krzyzewski", "John Calipari", "Bill Self", "Roy Williams", "Mick Cronin"],
        ["Noelle Quinn", "Bill Laimbeer", "Derek Fisher", "Cheryl Reeve", "Sandy Brondello"],
        ["Brian Goorjian", "Sergio Scariolo", "Vincent Collet", "Sergio Hernandez", "Gregg Popovich"]
    ];

    for (let i = 0; i < competitionNames.length; i++) {
        const competition = await prisma.competition.create({
            data: {
                name: competitionNames[i],
            },
        });

        for (let j = 0; j < teamNames[i].length; j++) {
            const team = await prisma.team.create({
                data: {
                    name: teamNames[i][j],
                    competitionId: competition.id,
                },
            });

            for (let k = 0; k < playerNames[j].length; k++) {
                const hashedPassword = await bcrypt.hash("password123", 12);
                const user = await prisma.user.create({
                    data: {
                        name: playerNames[j][k],
                        email: `player${k}_team${j}_comp${i}@example.com`,
                        password: hashedPassword,
                        role: "player",
                    },
                });
                await prisma.player.create({
                    data: {
                        userId: user.id,
                        teamId: team.id,
                        number: k + 1,
                    },
                });
            }

            for (let l = 0; l < 2; l++) {
                const hashedPassword = await bcrypt.hash("password123", 12);
                const user = await prisma.user.create({
                    data: {
                        name: coachNames[j][l],
                        email: `coach${l}_team${j}_comp${i}@example.com`,
                        password: hashedPassword,
                        role: "coach",
                    },
                });
                await prisma.coach.create({
                    data: {
                        userId: user.id,
                        teamId: team.id,
                    },
                });
            }
        }
    }
};

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });