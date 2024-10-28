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
  lastEdit: Date;
  dateCreated: Date;
};
