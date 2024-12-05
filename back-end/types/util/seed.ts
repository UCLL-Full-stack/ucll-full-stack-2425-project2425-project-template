import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {

  await prisma.vehicle.deleteMany();

  const vehicles = [
    {
      manufacturer: 'Toyota',
      model_name: 'Camry',
      price: 25000,
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      year: 2021,
      vehicleType: 'Car',
      bodyType: 'Sedan',
      mileage: 0,
      engineCapacity: 2500,
    },
    {
      manufacturer: 'Toyota',
      model_name: 'Yaris',
      price: 15000,
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      year: 2021,
      vehicleType: 'Car',
      bodyType: 'Hatchback',
      mileage: 0,
      engineCapacity: 1500,
    },
    {
      manufacturer: 'Toyota',
      model_name: 'Highlander',
      price: 40000,
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      year: 2021,
      vehicleType: 'Car',
      bodyType: 'SUV',
      mileage: 0,
      engineCapacity: 3500,
    },
    {
      manufacturer: 'Yamaha',
      model_name: 'R6',
      price: 10000,
      fuelType: 'Petrol',
      transmissionType: 'Manual',
      year: 2015,
      vehicleType: 'Motorcycle',
      bodyType: 'Sport Bike',
      mileage: 6000,
      engineCapacity: 450,
    },
    {
      manufacturer: 'Yamaha',
      model_name: 'R7',
      price: 15000,
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      year: 2015,
      vehicleType: 'Motorcycle',
      bodyType: 'Sport Bike',
      mileage: 3000,
      engineCapacity: 450,
    },
    {
      manufacturer: 'Honda',
      model_name: 'Civic',
      price: 22000,
      fuelType: 'Petrol',
      transmissionType: 'Manual',
      year: 2020,
      vehicleType: 'Car',
      bodyType: 'Sedan',
      mileage: 15000,
      engineCapacity: 2000,
    },
    {
      manufacturer: 'Ford',
      model_name: 'Mustang',
      price: 55000,
      fuelType: 'Petrol',
      transmissionType: 'Automatic',
      year: 2022,
      vehicleType: 'Car',
      bodyType: 'Coupe',
      mileage: 5000,
      engineCapacity: 5000,
    },
    {
      manufacturer: 'Kawasaki',
      model_name: 'Ninja ZX-6R',
      price: 12000,
      fuelType: 'Petrol',
      transmissionType: 'Manual',
      year: 2019,
      vehicleType: 'Motorcycle',
      bodyType: 'Sport Bike',
      mileage: 8000,
      engineCapacity: 600,
    },
    {
      manufacturer: 'Tesla',
      model_name: 'Model S',
      price: 80000,
      fuelType: 'Electric',
      transmissionType: 'Automatic',
      year: 2023,
      vehicleType: 'Car',
      bodyType: 'Sedan',
      mileage: 0,
      engineCapacity: 0,
    },
    {
      manufacturer: 'Ducati',
      model_name: 'Panigale V4',
      price: 30000,
      fuelType: 'Petrol',
      transmissionType: 'Manual',
      year: 2022,
      vehicleType: 'Motorcycle',
      bodyType: 'Sport Bike',
      mileage: 2000,
      engineCapacity: 1103,
    },
  ];

  for (const vehicleData of vehicles) {
    const vehicle = await prisma.vehicle.create({
      data: {
        manufacturer: vehicleData.manufacturer,
        model_name: vehicleData.model_name,
        price: vehicleData.price,
        fuelType: vehicleData.fuelType,
        transmissionType: vehicleData.transmissionType,
        year: vehicleData.year,
        vehicleType: vehicleData.vehicleType,
        bodyType: vehicleData.bodyType,
        mileage: vehicleData.mileage,
        engineCapacity: vehicleData.engineCapacity,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    if (vehicleData.vehicleType === 'Car') {
      await prisma.car.create({
        data: {
          manufacturer: vehicleData.manufacturer,
          model_name: vehicleData.model_name,
          price: vehicleData.price,
          fuelType: vehicleData.fuelType,
          transmissionType: vehicleData.transmissionType,
          year: vehicleData.year,
          vehicleType: vehicleData.vehicleType,
          bodyType: vehicleData.bodyType,
          mileage: vehicleData.mileage,
          engineCapacity: vehicleData.engineCapacity,
          vehicleId: vehicle.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    } else if (vehicleData.vehicleType === 'Motorcycle') {
      await prisma.motorcycle.create({
        data: {
          manufacturer: vehicleData.manufacturer,
          model_name: vehicleData.model_name,
          price: vehicleData.price,
          fuelType: vehicleData.fuelType,
          transmissionType: vehicleData.transmissionType,
          year: vehicleData.year,
          vehicleType: vehicleData.vehicleType,
          bodyType: vehicleData.bodyType,
          mileage: vehicleData.mileage,
          engineCapacity: vehicleData.engineCapacity,
          vehicleId: vehicle.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }
  }

  console.log('Data populated successfully!');
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
