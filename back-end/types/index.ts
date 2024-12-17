import { PaymentStatus } from "@prisma/client";

type StudentInput = {
    id?: number;
    user: UserInput;
    studentNumber: string;
    bookings?: BookingInput[];
}
type UserInput = {
    id?: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
};

type TripInput = {
    id?: number;
    destination: string;
    startDate: Date;
    endDate: Date;
    price: number;
    description: string;
    images: string;
}

type BookingInput = {
    id?: number;
    studentIds: number[];  
    tripId: number;    
    bookingDate?: Date;
    students?: StudentInput[];
    paymentStatus: PaymentStatus;
}

type ReviewInput = {
    id?: number;
    studentId: number; 
    tripId: number;     
    rating: number;      
    comment: string;
}

type Role = 'admin' | 'student' | 'guest';

type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
    fullname: string;

}

export{
    TripInput,
    BookingInput,
    StudentInput,
    ReviewInput,
    Role,
    UserInput,
    AuthenticationResponse
}