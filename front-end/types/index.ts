export type User = {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
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

  