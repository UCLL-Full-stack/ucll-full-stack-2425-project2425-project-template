type StudentInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    studentNumber: string;
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
    studentId: number;  
    trip?: TripInput;   
    bookingDate?: Date;
    paymentStatus: 'Pending' | 'Confirmed' | 'Cancelled';
}

type ReviewInput = {
    id?: number;
    studentId: number; 
    tripId: number;     
    rating: number;      
    comment: string;
}
type Role = 'admin' | 'user' | 'guest';

export{
    TripInput,
    BookingInput,
    StudentInput,
    ReviewInput,
    Role
}