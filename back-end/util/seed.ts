// Execute: npx ts-node util/seed.ts
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { connect } from 'http2';

const prisma = new PrismaClient();


const main = async () => {
    await prisma.invite.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.event.deleteMany();
    await prisma.user.deleteMany();

    const admin = await prisma.user.create({
        data: {
            username: 'admin',
            name: 'admin',
            email: 'admin@ucll.be',
            password: await bcrypt.hash('admin', 12),
            age: 99,
            role: 'ADMIN',
            events: {}
        }
    });

    const john = await prisma.user.create({
        data: {
            username: 'john_doe',
            name: 'John Doe',
            email: 'john.doe@ucll.be',
            password: await bcrypt.hash('passwordJohn', 12),
            age: 26,
            role: 'ORGANIZER',
            events: {}
        }
    });

    const jane = await prisma.user.create({
        data: {
            username: 'jane_doe',
            name: 'Jane Doe',
            email: 'jane.doe@ucll.be',
            password: await bcrypt.hash('passwordJane', 12),
            age: 30,
            role: 'PARTICIPANT',
            events: {}
        }
    });

    const alice = await prisma.user.create({
        data: {
            username: 'alice_smith',
            name: 'Alice Smith',
            email: 'alice.smith@ucll.be',
            password: await bcrypt.hash('passwordAlice', 12),
            age: 24,
            role: 'PARTICIPANT',
            events: {}
        }
    });

    const bob = await prisma.user.create({
        data: {
            username: 'bob_brown',
            name: 'Bob Brown',
            email: 'bob.brown@ucll.be',
            password: await bcrypt.hash('passwordBob', 12),
            age: 29,
            role: 'PARTICIPANT',
            events: {}
        }
    });

    const charlie = await prisma.user.create({
        data: {
            username: 'charlie_miller',
            name: 'Charlie Miller',
            email: 'charlie.miller@ucll.be',
            password: await bcrypt.hash('passwordCharlie', 12),
            age: 22,
            role: 'PARTICIPANT',
            events: {}
        }
    });

    const diana = await prisma.user.create({
        data: {
            username: 'diana_jones',
            name: 'Diana Jones',
            email: 'diana.jones@ucll.be',
            password: await bcrypt.hash('passwordDiana', 12),
            age: 27,
            role: 'PARTICIPANT',
            events: {}
        }
    });

    const eve = await prisma.user.create({
        data: {
            username: 'eve_white',
            name: 'Eve White',
            email: 'eve.white@ucll.be',
            password: await bcrypt.hash('passwordEve', 12),
            age: 25,
            role: 'PARTICIPANT',
            events: {}
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
            isTrending: false,
        }
    });

    const ticketVIP1 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            cost: 100,
            user: {},
            event: {
                connect: { id: taylorswiftconcert.id }
            },
        }
    });

    const ticketVIP2 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            cost: 120,
            user: {},
            event: {
                connect: { id: taylorswiftconcert.id }
            },
        }
    });

    const ticketVIP3 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            cost: 140,
            user: {},
            event: {
                connect: { id: taylorswiftconcert.id }
            },
        }
    });

    const ticketVIP4 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            cost: 140,
            user: {},
            event: {
                connect: { id: artExhibition.id }
            },
        }
    });

    const ticketVIP5 = await prisma.ticket.create({
        data: {
            type: 'VIP',
            cost: 140,
            user: {},
            event: {
                connect: { id: artExhibition.id }
            },
        }
    });

    const ticketREGULAR1 = await prisma.ticket.create({
        data: {
            type: 'REGULAR',
            cost: 50,
            user: {},
            event: {
                connect: { id: companyNetworkingNight.id }
            },
        }
    });

    const ticketREGULAR2 = await prisma.ticket.create({
        data: {
            type: 'REGULAR',
            cost: 45,
            user: {},
            event: {
                connect: { id: companyNetworkingNight.id }
            },
        }
    });

    const ticketREGULAR3 = await prisma.ticket.create({
        data: {
            type: 'REGULAR',
            cost: 65,
            user: {},
            event: {
                connect: { id: companyNetworkingNight.id }
            },
        }
    });

    const ticketREGULAR4 = await prisma.ticket.create({
        data: {
            type: 'REGULAR',
            cost: 55,
            user: {},
            event: {
                connect: { id: yogaWorkshop.id }
            },
        }
    });

    const ticketREGULAR5 = await prisma.ticket.create({
        data: {
            type: 'REGULAR',
            cost: 55,
            user: {},
            event: {
                connect: { id: startupPitchCompetition.id }
            },
        }
    });

    const ticketFREE1 = await prisma.ticket.create({
        data: {
            type: 'FREE',
            cost: 0,
            user: {},
            event: {
                connect: { id: companyNetworkingNight.id }
            },
        }
    });

    const ticketFREE2 = await prisma.ticket.create({
        data: {
            type: 'FREE',
            cost: 0,
            user: {},
            event: {
                connect: { id: companyNetworkingNight.id }
            },
        }
    });

    const ticketFREE3 = await prisma.ticket.create({
        data: {
            type: 'FREE',
            cost: 0,
            user: {},
            event: {
                connect: { id: companyNetworkingNight.id }
            },
        }
    });

    const ticketFREE4 = await prisma.ticket.create({
        data: {
            type: 'FREE',
            cost: 0,
            user: {},
            event: {
                connect: { id: chrisBirthdayParty.id }
            },
        }
    });

    const ticketSTUDENT1 = await prisma.ticket.create({
        data: {
            type: 'STUDENT',
            cost: 12,
            user: {},
            event: {
                connect: { id: yogaWorkshop.id }
            },
        }
    });

    const ticketSTUDENT2 = await prisma.ticket.create({
        data: {
            type: 'STUDENT',
            cost: 17,
            user: {},
            event: {
                connect: { id: yogaWorkshop.id }
            },
        }
    });

    const ticketSTUDENT3 = await prisma.ticket.create({
        data: {
            type: 'STUDENT',
            cost: 15,
            user: {},
            event: {
                connect: { id: startupPitchCompetition.id }
            },
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
