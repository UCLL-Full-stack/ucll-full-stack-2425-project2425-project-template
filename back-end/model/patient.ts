
export class patient {
    readonly id?: number;
    readonly name: string;
    readonly sex: string;
    readonly dateOfBirth: Date;
    readonly age: number;
    readonly address: string;
    readonly email: string;
    readonly complaints: string[];
    readonly nationalRegister: string;

    constructor (patient: {id?: number; name: string; sex: string; dateOfBirth: Date; age: number; address: string; email: string; complaints: string[]; nationalRegister: string;}) {
        this.id = patient.id;
        this.name = patient.name;
        this.sex = patient.sex;
        this.dateOfBirth = patient.dateOfBirth;
        this.age = patient.age;
        this.address = patient.address;
        this.email = patient.email;
        this.complaints = patient.complaints;
        this.nationalRegister = patient.nationalRegister;
    }

    validate(patient: {id?: number; name: string; sex: string; dateOfBirth: Date; age: number; address: string; email: string; complaints: string[]; nationalRegister: string;}) {
        if (patient.name.trim() == "")
            throw new Error("Playlist name cannot be empty")
    }

}