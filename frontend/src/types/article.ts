export interface Article {
    _id: string;
    title: string;
    body: string;
    views: number;
    ratings?: number[];
    timeSpent?: number;
    createdAt: string;
    updatedAt: string;
}

export interface ArticleResponse {
    articles: Article[];
    total: number;
    page: number;
    totalPages: number;
}