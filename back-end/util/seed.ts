import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.caretaker.deleteMany();
    await prisma.manager.deleteMany();
    await prisma.animal.deleteMany();
    await prisma.expense.deleteMany();
    await prisma.species.deleteMany();

    const hashedPassword = await bcrypt.hash('password', 12);

    // Create Admin
    const admin = await prisma.user.create({
        data: {
            username: 'admin_user',
            password: hashedPassword,
            role: 'admin',
            admin: {
                create: {
                    name: 'Admin User'
                }
            }
        }
    });

    // Create Caretakers
    const caretakerData = [
        { username: 'john_doe', name: 'John Doe' },
        { username: 'jane_smith', name: 'Jane Smith' },
        { username: 'alice_johnson', name: 'Alice Johnson' }
    ];
    const caretakers = await Promise.all(
        caretakerData.map((data) =>
            prisma.user.create({
                data: {
                    username: data.username,
                    password: hashedPassword,
                    role: 'caretaker',
                    caretaker: {
                        create: {
                            name: data.name
                        }
                    }
                },
                include: {
                    caretaker: true
                }
            })
        )
    );

    // Create Managers
    const managerData = [
        { username: 'bob_brown', name: 'Bob Brown' },
        { username: 'charlie_davis', name: 'Charlie Davis' }
    ];
    const managers = await Promise.all(
        managerData.map((data) =>
            prisma.user.create({
                data: {
                    username: data.username,
                    password: hashedPassword,
                    role: 'manager',
                    manager: {
                        create: {
                            name: data.name
                        }
                    }
                }
            })
        )
    );

    // Create Species
    const speciesList = await Promise.all(
        ['Cow', 'Sheep', 'Pig', 'Chicken'].map(species =>
            prisma.species.create({
                data: {
                    species
                }
            })
        )
    );

    // Create Animals and Expenses
    const animalNames = [
        'Bella', 'Max', 'Charlie', 'Molly', 'Buddy', 'Daisy', 'Rocky', 'Luna', 'Jack', 'Lucy',
        'Toby', 'Bailey', 'Coco', 'Oscar', 'Rosie'
    ];
    const favouriteFoods = [
        'Carrots', 'Apples', 'Bananas', 'Fish', 'Chicken', 'Beef', 'Lettuce', 'Corn', 'Peas', 'Rice',
        'Oats', 'Wheat', 'Barley', 'Soybeans', 'Potatoes'
    ];
    const favouriteToys = [
        'Ball', 'Frisbee', 'Rope', 'Squeaky Toy', 'Chew Toy', 'Plush Toy', 'Laser Pointer', 'Feather Wand', 'Tunnel', 'Scratching Post',
        'Puzzle Toy', 'Treat Dispenser', 'Catnip Toy', 'Mouse Toy', 'Bell Toy'
    ];
    const animals = await Promise.all(
        animalNames.map(async (name, index) => {
            const caretaker = caretakers[index % caretakers.length].caretaker;
            const species = speciesList[index % speciesList.length];
            if (caretaker) {
                return prisma.animal.create({
                    data: {
                        name,
                        age: Math.floor(Math.random() * 10) + 1,
                        speciesId: species.id,
                        favouriteFood: favouriteFoods[index],
                        favouriteToy: favouriteToys[index],
                        caretakerId: caretaker.id, // Correctly reference caretakerId
                        expenses: {
                            create: Array.from({ length: Math.floor(Math.random() * 3) + 1 }).map((_, expenseIndex) => ({
                                totalCost: Math.floor(Math.random() * 1000) + 100,
                                month: `0${expenseIndex + 1}-2021`
                            }))
                        }
                    }
                });
            }
        })
    );

    console.log('Seed data created successfully');
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