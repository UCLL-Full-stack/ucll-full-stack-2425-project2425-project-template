export class Bank {
    private id?: number;
    private bankName: string;
    private phoneNumber: string;
    private address: string;

    constructor(bank: { id?: number; bankName: string; phoneNumber: string; address: string }) {
        this.id = bank.id;
        this.bankName = bank.bankName;
        this.phoneNumber = bank.phoneNumber;
        this.address = bank.address;
    }

    getId(): number | undefined {
        return this.id;
    }

    getBankName(): string {
        return this.bankName;
    }

    getPhoneNumber(): string {
        return this.phoneNumber;
    }

    getAddress(): string {
        return this.address;
    }
}
