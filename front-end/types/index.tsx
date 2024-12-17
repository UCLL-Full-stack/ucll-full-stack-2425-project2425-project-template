type Student = {
    id?: number;
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
type User = {
    firstName?: string;
    lastName?: string;
    fullname?: string;
    email?: string;
    username?: string;
    password?: string;
    role?: string;
};
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
    User,
    Role
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
}