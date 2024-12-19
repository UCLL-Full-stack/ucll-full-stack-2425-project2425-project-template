export type Car = {
  id?: number;
  model?: string;
  brand?: string;
  year?: number;
  licensePlate?: string;
  price?: number;
};

export type CarPart = {
  id?: number;
  name: string;
  price: number;
  quantity: number;
};

export type User = {
  id?: number;
  name?: string;
  password?: string;
  email: string;
  role?: string;
};
export type StatusMessage = {
  message: string;
  type: "error" | "success";
};