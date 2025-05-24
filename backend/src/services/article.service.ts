import ArticleModel from "../models/article.model";
import { Article } from "../types/article";

export const findAllArticles = async ({skip , limit}: {skip: number, limit: number}): Promise<Article[]> => {
  return ArticleModel.find()
    .sort({ createdAt: -1 })
    .skip(skip ?? 0)
    .limit(limit ?? 8)
    .lean() as unknown as Article[];
};

export const countArticles = async (): Promise<number> => {
  return ArticleModel.countDocuments();
};

export const findArticleById = async (id: string): Promise<Article | null> => {
  return ArticleModel.findById(id);
};

export const createArticle = async (data: Article): Promise<Article> => {
  const article = new ArticleModel(data);
  return article.save() as unknown as Article;
};

export const deleteArticle = async (id: string) => {
  return ArticleModel.findByIdAndDelete(id);
};

export const incrementViewCount = async (id: string) => {
  return ArticleModel.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
};

export const addRating = async (id: string, rating: number): Promise<Article | null> => {
  return ArticleModel.findByIdAndUpdate(
    id,
    { $push: { ratings: rating } },
    { new: true }
  );
}

export const updateTimeSpent = async (id: string, timeSpent: number): Promise<Article | null> => {
  const article = await ArticleModel.findById(id);
  if (!article) {
    return null;
  }
  article.timeSpent += timeSpent;
  await article.save();
  return article as unknown as Article;
};