import { Role } from '../types';
import { User as UserPrisma } from '@prisma/client';

export class User {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly role: Role;
    readonly phone_number: string;
    readonly birth_date: Date;

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        role: Role;
        phone_number: string;
        birth_date: Date;
    }) {
        this.validate(user);

        this.id = user.id;
        this.name = user.name;
        this.birth_date = user.birth_date;
        this.password = user.password;
        this.role= user.role;
        this.phone_number= user.phone_number;
        this.email= user.email;
    }


    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getBirthDate(): Date {
        return this.birth_date;
    }

    getPassword(): string {
        return this.password;
    }

    getPhoneNumber(): string {
        return this.phone_number;
    }
    
    getEmail(): string {
        return this.email;
    }

    getRole(): Role {
        return this.role;
    }

    validate(user: {
            name: string;
            birth_date: Date;
            password: string;
            phone_number: string;
            email: string;
            role: Role;
          }) {
        if (!user.name?.trim() || user.name?.trim().length === 0) {
          throw new Error('Name is required');
        }
        if (!user.birth_date) {
          throw new Error('Birth date is required');
        }
        if (!user.password?.trim() || user.password?.trim().length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        if (!user.phone_number?.trim() || user.phone_number?.trim().length < 10) {
          throw new Error('Valid phone number is required');
        }
        if (!user.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
          throw new Error('Valid email is required');
        }
        if (!user.role?.trim() || user.role?.trim().length === 0) {
          throw new Error('Role is required');
        }
      }                                                 

    
      equals(user: User): boolean { 
        return (
          this.id === user.getId() &&
          this.name === user.getName() &&
          this.birth_date.getTime() === user.getBirthDate().getTime() &&
          this.password === user.getPassword() &&
          this.phone_number === user.getPhoneNumber() &&
          this.email === user.getEmail() &&
          this.role === user.getRole()
        );
      }

      static from({ id, name,email,password,role,birth_date,phone_number }: UserPrisma) {
        return new User({
            id,
            name,
            email,
            password,
            birth_date,
            phone_number,
            role: role as Role,
        });
    }

}
