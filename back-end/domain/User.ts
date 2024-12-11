import { Order } from './Order';

export class User {
    constructor(
        public id: number,
        public role: UserRole,
        public email: string,
        public password: string,
        public orders: Order[] = []
    ) {}

    static from(prismaUser: any): User {
        return new User(
            prismaUser.id,
            prismaUser.role,
            prismaUser.email,
            prismaUser.password,
            prismaUser.orders?.map(Order.from) || []
        );
    }

    validate() {
        if (!this.email || !this.email.includes('@')) {
            throw new Error('Invalid email.');
        }
        if (this.password.length < 6) {
            throw new Error('Password must be at least 6 characters.');
        }
    }
}

export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
