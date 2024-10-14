export class Vehicle{
    private readonly id?: number | undefined;
    private readonly manufacturer: string;
    private readonly model_name: string;
    private readonly price: number;
    private readonly fuel_type: string;
    private readonly transmission_type: string;
    private readonly year: number;

    constructor(vehicle: {
        id?: number, manufacturer: string,
        model_name: string, price: number, fuel_type: string, transmission_type: string, year: number
    }) {
        this.id == vehicle.id;
        this.manufacturer = vehicle.manufacturer;
        this.model_name = vehicle.model_name;
        this.price = vehicle.price;
        this.fuel_type = vehicle.fuel_type;
        this.transmission_type = vehicle.transmission_type;
        this.year = vehicle.year;
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
        return this.fuel_type
    }

    getTransmissionType(): string{
        return this.transmission_type
    }

    getYear(): number{
        return this.year
    }



}