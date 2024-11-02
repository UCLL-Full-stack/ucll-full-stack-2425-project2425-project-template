import { Specialization } from "../../types";
import { Office } from './office';

export class Doctor {

    readonly id?: number;
    private name: string;
    private email: string;
    private specialisation: Specialization;
    private offices: Office[];

    constructor(doctor: { id?: number; name: string; email: string; specialisation: Specialization; offices?: Office[] }) {
        this.id = doctor.id;
        this.name = doctor.name;
        this.email = doctor.email;
        this.specialisation = doctor.specialisation;
        this.offices = doctor.offices || [];
    }

    // Getters
    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getSpecialisation(): Specialization {
        return this.specialisation;
    }

    getOffices(): Office[] {
        return this.offices;
    }

    // Setters with validation
    setName(value: string) {
        if (value.trim().length < 3) {
            throw new Error("Name must be at least 3 characters long.");
        }
        this.name = value;
    }

    setEmail(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error("Invalid email format.");
        }
        this.email = value;
    }

    setSpecialisation(value: Specialization) {
        this.specialisation = value;
    }

    setOffices(value: Office[]) {
        if (!Array.isArray(value)) {
            throw new Error("Offices must be an array.");
        }
        this.offices = value;
    }

    // Add a single office to the offices array
    addOffice(office: Office): void {
        this.offices.push(office);
    }

    // Remove an office from the offices array
    removeOffice(office: Office): void {
        const index = this.offices.indexOf(office);
        if (index > -1) {
            this.offices.splice(index, 1);
        } else {
            throw new Error("Office not found.");
        }
    }

    // Validation method
    validate(doctor: { id?: number; name: string; email: string; specialisation: Specialization; offices?: Office[] }) {
        if (doctor.name.trim().length < 3) {
            throw new Error("Doctor's name must be at least 3 characters long.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(doctor.email)) {
            throw new Error("Invalid email format.");
        }
    }

    // Static method to create a Doctor from Prisma model or other sources
    static from(doctorData: { id?: number; name: string; email: string; specialisation: Specialization; offices: Office[] }) {
        return new Doctor(doctorData);
    }
}
