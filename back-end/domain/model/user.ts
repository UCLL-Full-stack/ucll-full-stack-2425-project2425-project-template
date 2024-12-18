import bcrypt from "bcrypt";
import { User as UserPrisma } from '@prisma/client';
import { Vehicle as VehiclePrisma } from '@prisma/client';
import { Vehicle } from "./vehicle";
import { VehicleInput } from "../../types";


export class User {
    readonly id?: number | undefined;
    readonly email: string;
    readonly name: string;
    readonly dealer: boolean;
    private password: string;
    readonly phoneNumber: number;
    private listOfCarsForSelling: Vehicle[];
 

    constructor(user: {
        id?: number;
        email: string;
        name: string;
        password: string;
        dealer: boolean
        phoneNumber: number;
        listOfCarsForSelling: Vehicle[];
    
    }) {

        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.dealer = false
        this.password = user.password;
        this.phoneNumber = user.phoneNumber;
        this.listOfCarsForSelling = user.listOfCarsForSelling || [];
       
    }

    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async validatePassword(inputPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, this.password);
    }

    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getName(): string {
        return this.name;
    }

    getlistOfCarsForSelling(): Vehicle[] {
        return this.listOfCarsForSelling;
    }

    addCarForSelling(car: Vehicle): void {
        this.listOfCarsForSelling.push(car);
    }

    static from({
        id, email, name, password, phoneNumber, dealer, listOfCarsForSelling,
    }: UserPrisma & { listOfCarsForSelling: VehiclePrisma[]; }) {
        return new User({
            id,
            email,
            name,
            password,
            dealer,
            phoneNumber,
            listOfCarsForSelling: listOfCarsForSelling.map((vehiclePrisma: {
                id: number; manufacturer:
                string; model_name: string; price: number;
                fuelType: string; transmissionType: string; year: number;
                vehicleType: string; bodyType: string; mileage: number;
                engineCapacity: number; createdAt: Date; updatedAt: Date;
                sellerId: number | null;
            }) => Vehicle.from(vehiclePrisma))
        });
    }
}
