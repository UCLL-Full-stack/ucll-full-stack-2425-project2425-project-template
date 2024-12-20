import { Vehicle } from "../domain/model/vehicle";
import database from "./database";

const getAllVehicles = async (): Promise<Vehicle[]> => {
    const vehiclesPrisma = await database.vehicle.findMany({
        include: { seller: true }
    });
    return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma))
}

const getVehicleByID = async ({ id }: { id: number }): Promise<Vehicle | null> => {
    try {
        const vehiclesPrisma = await database.vehicle.findUnique({
            where: { id },
            include: { seller: true }
        })
        return vehiclesPrisma ? Vehicle.from(vehiclesPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

// const getVehicleBySeller = async ({ sellerId }: { sellerId: number }): Promise<Vehicle[] | null> => {
//     try {
//         const vehiclesPrisma = await database.vehicle.findMany({
//             where: { sellerId },
//             include: { seller: true }
//         })
//         return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma & {sellerId: sellerId}));
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
    
// }
const getVehicleBySeller = async ({ sellerId }: { sellerId: number }): Promise<Vehicle[] | null> => {
    try {
        const vehiclesPrisma = await database.vehicle.findMany({
            where: { sellerId }, // Filter by sellerId
            include: { seller: true }, // Include seller relation
        });

        return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
export default {
    getAllVehicles,
    getVehicleByID,
    // createVehicle
    getVehicleBySeller
}

// import { Vehicle } from "../domain/model/vehicle";
// import database from "./database";

// const getAllVehicles = async (): Promise<Vehicle[]> => {
//     try {
//         const vehiclesPrisma = await database.vehicle.findMany({
//             include: { seller: true }
//         })
//         return vehiclesPrisma.map((vehiclePrisma) => Vehicle.from(vehiclePrisma));
//     } catch (error) {
//         console.log(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }


// const createVehicle = async (vehicle : Vehicle): Promise<Vehicle> =>{
//     try{
//         const vehiclePrisma = await database.vehicle.create({
//             data: {
//                 manufacturer: vehicle.getManufacturer(),
//                 model_name: vehicle.getModelName(),
//                 price: vehicle.getPrice(),
//                 fuelType: vehicle.getFuelType(),
//                 transmissionType: vehicle.getTransmissionType(),
//                 bodyType: vehicle.getBodyType(),
//                 year: vehicle.getYear(),
//                 vehicleType: vehicle.getVehicleType(),
//                 mileage: vehicle.getMileage(),
//                 engineCapacity: vehicle.getEngineCapacity(),
//                 createdAt: vehicle.getCreatedAt() ?? new Date(),
//                 updatedAt: vehicle.getUpdatedAt() ?? new Date(),  
//             },
//         })
//         return Vehicle.from(vehiclePrisma);
//     }catch(error){
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// }


// const createVehicle = async ({
//     manufacturer,
//     model_name,
//     price,
//     fuelType,
//     transmissionType,
//     bodyType,
//     year,
//     vehicleType,
//     mileage,
//     engineCapacity,
//     createdAt,
//     updatedAt,
//     userId
// }: {
//     manufacturer: string;
//     model_name: string;
//     price: number;
//     fuelType: string;
//     transmissionType: string;
//     bodyType: string;
//     year: number;
//     vehicleType: string;
//     mileage: number;
//     engineCapacity: number;
//     createdAt: Date;
//     updatedAt: Date;
//     userId: string; // The user ID for linking the vehicle to a seller
// }) => {
//     try {
//         // Create the vehicle and associate it with the user
//         const newCar = await prisma.vehicle.create({
//             data: {
//                 manufacturer,
//                 model_name,
//                 price,
//                 fuelType,
//                 transmissionType,
//                 bodyType,
//                 year,
//                 vehicleType,
//                 mileage,
//                 engineCapacity,
//                 createdAt,
//                 updatedAt,
//                 user: {
//                     connect: { id: userId }, // Link the vehicle to the user
//                 },
//             },
//         });

//         return newCar;
//     } catch (error) {
//         console.error('Error creating vehicle:', error);
//         throw new Error('Could not create vehicle');
//     }
// };


// function findVehicleById(id: number): Vehicle | undefined {
//     return cars.find(vehicle => vehicle.id === id);
// }

// const deleteVehicleFromDatabase = (vehicleId: number): boolean => {
//     const index = cars.findIndex(vehicle => vehicle.id === vehicleId);
//     if (index !== -1) {
//         cars.splice(index, 1);
//         return true;
//     }
//     return false;
// };

// const updateVehicle = (vehicleId: number, newVehicleData: Vehicle): Vehicle => {

//     //finds the index of the car so you can replace it in the list
//     const vehicleIndex = cars.findIndex(vehicle => vehicle.id === vehicleId);

//     const oldVehicle = findVehicleById(vehicleId)

//     const updatedVehicle = new Vehicle({
//         manufacturer: newVehicleData.manufacturer,
//         model_name: newVehicleData.model_name,
//         price: newVehicleData.price,
//         fuelType: newVehicleData.fuelType,
//         transmissionType: newVehicleData.transmissionType,
//         year: newVehicleData.year,
//         vehicleType: newVehicleData.vehicleType,
//         engineCapacity: newVehicleData.engineCapacity,
//         bodyType: newVehicleData.bodyType,
//         mileage: newVehicleData.mileage,
//         id: oldVehicle?.id,
//         createdAt: oldVehicle?.createdAt,
//         updatedAt: new Date()

//     });

//     cars[vehicleIndex] = updatedVehicle;

//     return updatedVehicle;
// };

// const filterCars = (filters: any) => {
//     const filterObject: any = {
//         manufacturer: filters.manufacturer || undefined,
//         model_name: filters.model_name || undefined,
//         fuelType: filters.fuelType || undefined,
//         transmissionType: filters.transmissionType || undefined,
//         bodyType: filters.bodyType || undefined,
//         vehicleType: filters.vehicleType || undefined,
//         price: filters.min_price || filters.max_price ? {
//             gte: filters.min_price || undefined,
//             lte: filters.max_price || undefined
//         } : undefined,
//         year: filters.min_year || filters.max_year ? {
//             gte: filters.min_year || undefined,
//             lte: filters.max_year || undefined
//         } : undefined,
//         mileage: filters.min_mileage || filters.max_mileage ? {
//             gte: filters.min_mileage || undefined,
//             lte: filters.max_mileage || undefined
//         } : undefined
//     };
//     Object.keys(filterObject).forEach((key) => {
//         if (filterObject[key] === undefined) delete filterObject[key]
//     });

//     return prisma.vehicle.findMany({ where: filterObject });

// }

// const getAllCars = (): Vehicle[] => cars;

// const getVehicleBySeller = (sellerId: number): Vehicle[] => {
//     return cars.filter(vehicle => vehicle.sellerId === sellerId);
// }

