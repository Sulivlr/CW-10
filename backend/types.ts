export interface News {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
}

export interface NewsMutation {
  title: string;
  content: string;
  image: string | null;
}