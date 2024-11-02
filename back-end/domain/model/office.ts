import { Office as OfficePrisma} from "@prisma/client";

export class Office {
    readonly name?: string;
    private address: string;
    private email: string;
    private openingHours: TimeRanges;
    private phoneNumber: number;

    // Constructor to initialize an Office instance
    constructor(office: { name?: string; address: string; email: string; openingHours: TimeRanges; phoneNumber: number }) {
        this.name = office.name;
        this.address = office.address;
        this.email = office.email;
        this.openingHours = office.openingHours;
        this.phoneNumber = office.phoneNumber;
    }

    // Getters
    getName(): string | undefined {
        return this.name;
    }

    getAddress(): string {
        return this.address;
    }

    getEmail(): string {
        return this.email;
    }

    getOpeningHours(): TimeRanges {
        return this.openingHours;
    }

    getPhoneNumber(): number {
        return this.phoneNumber;
    }

    // Setters with validation
    setAddress(value: string) {
        if (value.trim().length === 0) {
            throw new Error("Address cannot be empty.");
        }
        this.address = value;
    }

    setEmail(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error("Invalid email format.");
        }
        this.email = value;
    }

    setOpeningHours(value: TimeRanges) {
        this.openingHours = value;
    }

    setPhoneNumber(value: number) {
        if (value.toString().length < 10) {
            throw new Error("Phone number must be at least 10 digits long.");
        }
        this.phoneNumber = value;
    }

    // Static method to create an Office instance
    static from(officeData: { name?: string; address: string; email: string; openingHours: TimeRanges; phoneNumber: number }): Office {
        return new OfficePrisma(officeData);
    }
}
