export type User = {
    name?: string;
    email?: string;
    password?: string;
    role?: Role;
  };

  export type Family = {
    name?: string;
    familyList?: User[];
    owner?: User;
  }

  export type Role = 'admin' | 'parent' | 'child';