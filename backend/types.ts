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

export interface Commentary {
  id: number;
  news_id: number;
  author: string | 'Anonymous';
  text: string | null;
}

export interface CommentsMutation {
  news_id: number;
  author: string | 'Anonymous';
  text: string | null;
}