export class Customer {
    private id?: undefined | number;
    private password: string;
    private securityQuestion: string;
    private username: string;
    private firstName: string;
    private lastName: string;
    private phone: number;

    constructor(customer: { 
        id?: undefined | number;
        password: string;
        securityQuestion: string;
        username: string;
        firstName: string;
        lastName: string;
        phone: number;
     }) {
        this.id = customer.id;
        this.password = customer.password;
        this.securityQuestion = customer.securityQuestion;
        this.username = customer.username;
        this.firstName = customer.firstName;
        this.lastName = customer.lastName;
        this.phone = customer.phone;
    }

    getId(): undefined | number {
        return this.id;
    }

    getPassword(): string {
        return this.password;
    }
    setPassword(password: string): void {
        this.password = password;
    }
    
    getSecurityQuestion(): string {
        return this.securityQuestion;
    }

    setSecurityQuestion(securityQuestion: string): void {
        this.securityQuestion = securityQuestion;
    }
    
    getUsername(): string {
        return this.username;
    }

    setUsername(username: string): void {
        this.username = username;
    }
    
    getFirstName(): string {
        return this.firstName;
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName;
    }
    
    getLastName(): string {
        return this.lastName;
    }

    setLastName(lastName: string): void {
        this.lastName = lastName;
    }
    
    getPhone(): number {
        return this.phone;
    }

    setPhone(phone: number): void {
        this.phone = phone;
    }
}