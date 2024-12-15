import { PaymentStatus } from "@prisma/client";

type StudentInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    studentNumber: string;
    bookings?: BookingInput[];
}

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

type Role = 'admin' | 'user' | 'guest';

type AuthenticationResponse = {
    token: string;
    username: string;
}

export{
    TripInput,
    BookingInput,
    StudentInput,
    ReviewInput,
    Role,
    AuthenticationResponse
}