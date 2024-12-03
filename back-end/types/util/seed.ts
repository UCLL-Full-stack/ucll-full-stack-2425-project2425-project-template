// Execute: npx ts-node util/seed.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.vehicle.deleteMany();

    const Toyota_Camry = await prisma.vehicle.create({
        data: {
            manufacturer: 'Toyota',
            model_name: 'Camry',
            price: 25000,
            fuelType: 'Petrol',
            transmissionType: 'Automatic',
            year: 2021,
            vehicleType: 'Sedan',
            bodyType: 'Sedan',
            mileage: 0,
            engineCapacity: 2500,
            createdAt: new Date(),
            updatedAt: new Date(),

        },
    });

    const Toyota_Highlander = await prisma.vehicle.create({
        data: {
            manufacturer: 'Toyota',
            model_name: 'Highlander',
            price: 40000,
            fuelType: 'Petrol',
            transmissionType: 'Automatic',
            year: 2021,
            vehicleType: 'SUV',
            bodyType: 'SUV',
            mileage: 0,
            engineCapacity: 3500,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const Toyota_Corolla = await prisma.vehicle.create({
        data: {
            manufacturer: 'Toyota',
            model_name: 'Corolla',
            price: 20000,
            fuelType: 'Petrol',
            transmissionType: 'Automatic',
            year: 2021,
            vehicleType: 'Sedan',
            bodyType: 'Sedan',
            mileage: 0,
            engineCapacity: 1800,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const Toyota_Rav4 = await prisma.vehicle.create({
        data: {
            manufacturer: 'Toyota',
            model_name: 'Rav4',
            price: 30000,
            fuelType: 'Petrol',
            transmissionType: 'Automatic',
            year: 2021,
            vehicleType: 'SUV',
            bodyType: 'SUV',
            mileage: 0,
            engineCapacity: 2500,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const Toyota_Yaris = await prisma.vehicle.create({
        data: {
            manufacturer: 'Toyota',
            model_name: 'Yaris',
            price: 15000,
            fuelType: 'Petrol',
            transmissionType: 'Automatic',
            year: 2021,
            vehicleType: 'Hatchback',
            bodyType: 'Hatchback',
            mileage: 0,
            engineCapacity: 1500,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const Toyota_Sienna = await prisma.vehicle.create({
        data: {
            manufacturer: 'Toyota',
            model_name: 'Sienna',
            price: 35000,
            fuelType: 'Petrol',
            transmissionType: 'Automatic',
            year: 2021,
            vehicleType: 'Minivan',
            bodyType: 'Minivan',
            mileage: 0,
            engineCapacity: 3500,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const Toyota_Supra = await prisma.vehicle.create({
        data: {
            manufacturer: 'Toyota',
            model_name: 'Supra',
            price: 60000,
            fuelType: 'Petrol',
            transmissionType: 'Automatic',
            year: 2021,
            vehicleType: 'Sports Car',
            bodyType: 'Coupe',
            mileage: 0,
            engineCapacity: 3000,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
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
