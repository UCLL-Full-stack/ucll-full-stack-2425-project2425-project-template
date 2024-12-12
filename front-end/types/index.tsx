export type Category = {
  id?: number;
  name: string;
  description: string;
};

export type Location = {
  id?: number;
  street: string;
  number: number;
  city: string;
  country: string;
};

export type Event = {
  id?: number;
  name: string;
  date: Date;
  price: number;
  minParticipants: number;
  maxParticipants: number;
  location: Location;
  category: Category;
  lastEdit?: Date;
  dateCreated?: Date;
};
export type Role = "User" | "Admin" | "Guest";

export type Profile = {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  location: Location;
  category: Category;
  events: Event[];
};

export type StatusMessage = {
  message: String;
  type: "error" | "success";
};

export type User = {
  id?: number;
  userName?: string;
  email?: string;
  role?: Role;
  password?: string;
  profile?: Profile;
};
