export type User = {
  id: string;
  username: string;
  email: string;
}

export type Recipe = {
  name: string;
  description: string;
  userId: string;
  user: User;
};

export type ListResponse<T> = {
  result: T[];
  pageCount: number;
  totalItems: number;
};

