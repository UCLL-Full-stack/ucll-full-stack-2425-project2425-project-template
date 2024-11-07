// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();


const main = async () => {
    await prisma.event.deleteMany();
    await prisma.participant.deleteMany();
    await prisma.user.deleteMany();

    const participantJohn = await prisma.participant.create({
        data: {
            user: {
                create: {
                    username: 'john_doe',
                    name: 'John Doe',
                    email: 'john.doe@ucll.be',
                    password: 'passwordJohn',
                    age: 26,
                    role: 'participant',
                }
            }
        }
    });

    const participantJane = await prisma.participant.create({
        data: {
            user: {
                create: {
                    username: 'jane_doe',
                    name: 'Jane Doe',
                    email: 'jane.doe@ucll.be',
                    password: 'passwordJane',
                    age: 30,
                    role: 'participant',
                }
            }
        }
    });

    const participantAlice = await prisma.participant.create({
        data: {
            user: {
                create: {
                    username: 'alice_smith',
                    name: 'Alice Smith',
                    email: 'alice.smith@ucll.be',
                    password: 'passwordAlice',
                    age: 24,
                    role: 'participant',
                }
            }
        }
    });

    const participantBob = await prisma.participant.create({
        data: {
            user: {
                create: {
                    username: 'bob_brown',
                    name: 'Bob Brown',
                    email: 'bob.brown@ucll.be',
                    password: 'passwordBob',
                    age: 29,
                    role: 'participant',
                }
            }
        }
    });

    const participantCharlie = await prisma.participant.create({
        data: {
            user: {
                create: {
                    username: 'charlie_miller',
                    name: 'Charlie Miller',
                    email: 'charlie.miller@ucll.be',
                    password: 'passwordCharlie',
                    age: 22,
                    role: 'participant',
                }
            }
        }
    });

    const participantDiana = await prisma.participant.create({
        data: {
            user: {
                create: {
                    username: 'diana_jones',
                    name: 'Diana Jones',
                    email: 'diana.jones@ucll.be',
                    password: 'passwordDiana',
                    age: 27,
                    role: 'participant',
                }
            }
        }
    });

    const participantEve = await prisma.participant.create({
        data: {
            user: {
                create: {
                    username: 'eve_white',
                    name: 'Eve White',
                    email: 'eve.white@ucll.be',
                    password: 'passwordEve',
                    age: 25,
                    role: 'participant',
                }
            }
        }
    });




    const taylorswiftconcert = await prisma.event.create({
        data: {
            name: 'Taylor Swift Concert',
            description: 'Amazing music, sang by a talented artist.',
            date: new Date('2024-12-12'), //!!!
            location: 'Amsterdam',
            category: 'Concert',
            backgroundImage: '/images/taylor-swift-concert.jpg',
            participants:{
                connect: [{id: participantJohn.id}, {id: participantJane.id}]
            },
            isTrending: true,
        }
    });

    const chrisBirthdayParty = await prisma.event.create({
        data: {
            name: 'Chris Birthday Party',
            description: 'It is Chris Birthday!',
            date: new Date('2025-06-15'),
            location: 'Brussels',
            category: 'Birthday Celebration',
            backgroundImage: '/images/chris-birthday-party.jpg',
            participants: {
                connect: [
                    { id: participantAlice.id }
                ]
            },
            isTrending: true,
        }
    });


    const foodFestival = await prisma.event.create({
        data: {
            name: 'Food Festival',
            description: 'A festival with a variety of delicious foods from all around the world.',
            date: new Date('2024-11-20'),
            location: 'Paris',
            category: 'Culinary Festival',
            backgroundImage: '/images/food-festival.jpg',
            participants: {},
            isTrending: false,
        }
    });


    const companyNetworkingNight = await prisma.event.create({
        data: {
            name: 'Company Networking Night',
            description: 'An evening to connect and network with industry professionals.',
            date: new Date('2024-12-05'),
            location: 'Berlin',
            category: 'Company Networking Exchange',
            backgroundImage: '/images/company-networking-night.jpg',
            participants: {
                connect: [
                    { id: participantBob.id },
                    { id: participantCharlie.id },
                    { id: participantEve.id }
                ]
            },
            isTrending: true,
        }
    });


    const artExhibition = await prisma.event.create({
        data: {
            name: 'Art Exhibition: Modern Wonders',
            description: 'A showcase of contemporary art from emerging artists.',
            date: new Date('2025-02-18'),
            location: 'London',
            category: 'Art Exhibition',
            backgroundImage: '/images/art-exhibition.jpg',
            participants: {},
            isTrending: false,
        }
    });

    const yogaWorkshop = await prisma.event.create({
        data: {
            name: 'Yoga Workshop: Elevate Your Mind',
            description: 'A relaxing yoga session for all skill levels, focusing on mindfulness and flexibility.',
            date: new Date('2025-03-10'),
            location: 'Barcelona',
            category: 'Mindfulness',
            backgroundImage: '/images/yoga-workshop.jpg',
            participants: {},
            isTrending: false,
        }
    });


    const startupPitchCompetition = await prisma.event.create({
        data: {
            name: 'Startup Pitch Competition',
            description: 'Innovative startups compete to win funding and recognition.',
            date: new Date('2025-04-22'),
            location: 'Dublin',
            category: 'Entrepreneurship',
            backgroundImage: '/images/startup-pitch-competition.jpg',
            participants: {},
            isTrending: false,
        }
    });

    const wineTastingEvening = await prisma.event.create({
        data: {
            name: 'Wine Tasting Evening',
            description: 'An elegant evening of fine wines and gourmet pairings.',
            date: new Date('2025-07-08'),
            location: 'Rome',
            category: 'Sommelier Events',
            backgroundImage: '/images/wine-tasting-evening.jpg',
            participants: {},
            isTrending: false,
        }
    });

};

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
