export class Vehicle{
    
    readonly id?: number | undefined;
    readonly manufacturer: string;
    readonly model_name: string;
    readonly price: number;
    readonly fuelType: string;
    readonly transmissionType: string;
    readonly year: number;
    readonly bodyType: string;
    readonly vehicleType: string;
    readonly mileage: number;
    readonly engineCapacity : number;
    readonly createdAt? : Date;
    readonly updatedAt? : Date

    constructor(vehicle: {
        id?: number, manufacturer: string,
        model_name: string, price: number, fuelType: string, bodyType: string,
        transmissionType: string, year: number, vehicleType: string, mileage: number, engineCapacity: number, createdAt? : Date, updatedAt?: Date
    }) {
        this.id = vehicle.id;
        this.manufacturer = vehicle.manufacturer;
        this.model_name = vehicle.model_name;
        this.price = vehicle.price;
        this.fuelType = vehicle.fuelType;
        this.bodyType = vehicle.bodyType;
        this.engineCapacity = vehicle.engineCapacity;
        this.transmissionType = vehicle.transmissionType;
        this.year = vehicle.year;
        this.vehicleType = vehicle.vehicleType;
        this.mileage = vehicle.mileage;
        this.engineCapacity = vehicle.engineCapacity;
        this.createdAt = vehicle.createdAt;
        this.updatedAt = vehicle.updatedAt
    }


    getId() : number | undefined{
        return this.id
    }
    
    getManufacturer() : string{
        return this.manufacturer
    }

    getModelName(): string{
        return this.model_name
    }

    getPrice(): number{
        return this.price
    }

    getFuelType(): string{
        return this.fuelType
    }

    getMileage(): number{
        return this.mileage
    }

    getTransmissionType(): string{
        return this.transmissionType
    }

    getYear(): number{
        return this.year
    }

    getVehicleType(): string{
        return this.vehicleType
    }

    getVehicleBodyType(): string {
        return this.bodyType
    }

}