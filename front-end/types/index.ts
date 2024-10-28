export type User = {
  id?: number;
  role?: string;
  name: string;
  firstname: string;
  password: string;
}

export type StatusMessage = {
  message: string;
  type: string;
}