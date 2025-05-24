export interface Article {
    title: string;
    body: string;
    author: string;
    views?: number;
    createdAt?: string;
    updatedAt?: string;
    ratings?: Array<number>;
    timeSpent?: number;
    _id?: string;
  }
  