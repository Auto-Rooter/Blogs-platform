import { Request, Response } from "express";
import * as ArticleService from "../services/article.service";
import { exportArticles, importArticles } from "../services/analytics.service"; 
import logger from "../config/logger";
import mongoose from "mongoose";

export const getArticles = async (req: Request, res: Response) => {
  const page = parseInt(req?.query?.page as string) || 1;
  const limit = parseInt(req?.query?.limit as string) || 8;
  const skip = (page - 1) * limit;

  const [articles, total] = await Promise.all([
    ArticleService.findAllArticles({ skip, limit }),
    ArticleService.countArticles(),
  ]);

  res.json({
    articles,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
};


export const getArticleById = async (req: Request, res: Response): Promise<void> => {
  const {id} = req.params; 
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400).json({ message: "Invalid ID" });
    return;
  }
  const article = await ArticleService.findArticleById(id);
  if (!article){
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(article);
};

export const createArticle = async (req: Request, res: Response): Promise<void> => {
  const { title, body, user } = req.body;
  if (!title || !body){
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  const article = await ArticleService.createArticle({ title, body, author: user?._id });
  res.status(201).json(article);
};

export const deleteArticle = async (req: Request, res: Response): Promise<void> => {
  await ArticleService.deleteArticle(req.params.id);
  res.status(204).send();
};

// export const incrementView = async (req: Request, res: Response): Promise<void> => {
//     const article = await ArticleService.incrementViewCount(req.params.id);

//     if (!article) {
//         logger.warn(`View failed: article ${req.params.id} not found`);
//         res.status(404).json({ message: "Not found" });
//         return;
//       }
    
//       logger.info(`Article viewed: ${article._id}`);
//       res.json(article);
// };

export const importAllArticles = async (req: Request & { file?: any; user?: any }, res: Response) => {
  const file = req?.file;
  const userId = (req as any).user?._id;
  if (!file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const content = file.buffer.toString("utf-8");
  try {
    const articles = await importArticles(content, userId);
    res.status(201).json({ message: "Articles imported successfully", articles });
  } catch (error: Error | any) {
    logger.error(`Import failed: ${error.message}`);
    res.status(500).json({ message: "Import failed", error: error.message });
  }
}

export const exportAllArticles = async (req: Request, res: Response) => {
  console.log("Exporting articles...");
  const json = await exportArticles();
  res.setHeader("Content-Disposition", "attachment; filename=articles.json");
  res.setHeader("Content-Type", "application/json");
  res.send(json);
};

// export const submitRating = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { rating } = req.body;
//   console.log(">>>>>>>>>>>>>>: " + rating);
//   if(!mongoose.Types.ObjectId.isValid(id) || ![1,2,3,4,5].includes(rating)){
//     res.status(400).json({ message: "Invalid Input" });
//     return;
//   }

//   const article = await ArticleService.addRating(id, rating);
//   if (!article){
//     res.status(404).json({ message: "Not found" });
//     return;
//   }
//   logger.info(`Rating submitted for article ${id}: ${rating}`);
//   res.json(article);
// }

export const submitTimeSpent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { timeSpent } = req.body;

  if(!mongoose.Types.ObjectId.isValid(id) || typeof timeSpent !== 'number' || timeSpent < 0){
    res.status(400).json({ message: "Invalid Input" });
    return;
  }

  const article = await ArticleService.updateTimeSpent(id, timeSpent);
  if(!article){
    res.status(404).json({ message: "Not found" });
    return;
  }
  logger.info(`Time spent updated for article ${id}: ${timeSpent}`);
  res.json(article);
}