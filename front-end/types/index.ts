type Role = 'admin' | 'user' | 'guest';


export type Movie = {
    id?: number;
    name: string;
    duration: Date; 
    playingdates: Date[]; 
    genre: string;
    summary: string;
};


export type Room = {
    id?: number;
    name: string;
    chairs: number[];      
};


export type Task = {
    id?: number;
    date: Date;
    time: Date;     
    description: string;
    status: string;
    comment: string;
};


export type Ticket = {
    id?: number;
    price: number;
    date: Date;
    time: Date;
    chair: number;
};


export type User = {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: Role;            
};