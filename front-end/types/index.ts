export type Car = {
    id?: number;
    model?: string;
    brand?: string;
    year?: number;
    licensePlate?: string;
    price?: number;
};

export type User = {
    id?: number;
    username?: string;
    password?: string;
    email: string;
    role?: string;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
  };