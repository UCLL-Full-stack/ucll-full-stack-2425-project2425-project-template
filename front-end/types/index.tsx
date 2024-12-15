type Student = {
    id?: number;
    username: string;
    email: string;
    password: string;
    studentNumber: string;
}

type Trip = {
    id?: number;
    destination: string;
    startDate: Date;
    endDate: Date;
    price: number;
    description: string;
    images: string[];
}

type Booking = {
    id?: number;
    studentId: number;  
    tripId: number;    
    bookingDate: Date;
    paymentStatus: 'Pending' | 'Confirmed' | 'Cancelled';
}

type Review = {
    id?: number;
    studentId: number; 
    tripId: number;     
    rating: number;      
    comment: string;
}
type Role = 'admin' | 'user' | 'guest';

export type {
    Trip,
    Booking,
    Student,
    Review,
    Role
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
}