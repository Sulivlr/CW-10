export interface News {
  id: string;
  title: string;
  content: string;
  image: string | null;
  createdAt: string;
}

export interface NewsMutation {
  title: string;
  content: string;
  image: File | null;
  createdAt: string;
}