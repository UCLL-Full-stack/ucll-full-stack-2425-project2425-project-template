export type Game = {
  id: number;
  title: string;
  image: string;
  categories: string[];
  price: number;
  discount?: number;
};

export type Library = {
  id: number;
  games: Game[];
  achievements: number;
  timePlayed: number;
};

export type Profile = {
  id: number;
  description: string;
  profilePic: string;
}

export type User = {
  id: number;
  username: string;
  password: string;
  library: Library;
  profile: Profile;
  balance: number;
};

export type Purchase = {
  id: number;
  date: number;
  cost: number;
  user: User;
  game: Game;
}