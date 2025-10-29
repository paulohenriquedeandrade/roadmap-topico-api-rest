export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUser = Omit<
  User,
  "id" | "refreshToken" | "createdAt" | "updatedAt"
>;

export type UpdateUser = Partial<Omit<User, "id" | "createdAt" | "updatedAt">>;
