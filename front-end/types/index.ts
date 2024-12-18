export type User = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
  };

export type Movie = {
    id: number;
    director: string; 
    genre: string; 
    description: string; 
    duration: number; 
    title: string; 
    ageRating: number;
  };

  export type StatusMessage = {
    message?: string;
    type?: "error" | "success";
  };
  
export type UserForm = {
    name: string;
    email: string;
    password: string;
};

  