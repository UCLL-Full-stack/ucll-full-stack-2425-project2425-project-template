export type User = {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
  };

  export type Role = 'admin' | 'parent' | 'child';