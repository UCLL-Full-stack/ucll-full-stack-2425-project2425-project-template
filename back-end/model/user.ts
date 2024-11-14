export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private role: string;
    private phone_number: number;
    private birth_date: Date;

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        role: string;
        phone_number: number;
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

    getPhoneNumber(): number {
        return this.phone_number;
    }
    
    getEmail(): string {
        return this.email;
    }

    getRole(): string {
        return this.role;
    }

    validate(user: {
            name: string;
            birth_date: Date;
            password: string;
            phone_number: number;
            email: string;
            role: string;
          }) {
        if (!user.name || user.name.trim().length === 0) {
          throw new Error('Name is required');
        }
        if (!(user.birth_date instanceof Date) || isNaN(user.birth_date.getTime())) {
          throw new Error('Valid birth date is required');
        }
        if (!user.password || user.password.length < 6) {
          throw new Error('Password must be at least 6 characters long');
        }
        if (!user.phone_number || user.phone_number.toString().length < 10) {
          throw new Error('Valid phone number is required');
        }
        if (!user.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
          throw new Error('Valid email is required');
        }
        if (!user.role || user.role.trim().length === 0) {
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

}
