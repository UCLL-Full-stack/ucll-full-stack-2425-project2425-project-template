export type Task = {
    id: number;
    name: string;
    dueDate: Date;
    completed: boolean;
};

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};  

export type Project = {
    id: number;
    name: string;
    tasks: Task[];
    users: User[];
};
  
