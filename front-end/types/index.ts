export type User = {
  id?: string;
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  password?: string;
  role?: UserRole;
};

export type Exercise = {
  id: string;
  name?: string;
  description?: string;
  video_link?: string;
  isFavorite?: boolean;
};

export type Workout = {
  id: string;
  name?: string;
  description?: string;
  user?: User;
  exercises: Array<Exercise>;
};

export type StatusMessage = {
  message: string;
  type: "error" | "success";
};

export type UserRole = "admin" | "user" | "trainer";
