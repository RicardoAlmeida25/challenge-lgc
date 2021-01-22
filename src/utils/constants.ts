export const URLS = {};

// Generic types/interfaces

export interface Post {
  id: number;
  title: string;
  author: string;
  publishDate: Date;
  slug: string;
  description: string;
  content: string;
}

export interface Comment {
  id: number;
  postId: number;
  user: string;
  date: Date;
  content: string;
  replies?: Comment[];
}
