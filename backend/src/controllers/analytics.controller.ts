import { Request, Response } from "express";
import * as AnalyticsService from "../services/analytics.service";

export const getTopArticles = async (_req: Request, res: Response) => {
  const top = await AnalyticsService.getTopArticles();
  res.json(top);
};

export const getSummary = async (_req: Request, res: Response) => {
  const summary = await AnalyticsService.getArticleStats();
  res.json(summary);
};
