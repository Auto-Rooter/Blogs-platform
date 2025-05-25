import { Request, Response } from "express";
import * as AnalyticsService from "../services/analytics.service";
import viewModel from "../models/view.model";

export const getTopArticles = async (_req: Request, res: Response) => {
  const top = await AnalyticsService.getTopArticles();
  res.json(top);
};

export const getSummary = async (_req: Request, res: Response) => {
  const summary = await AnalyticsService.getArticleStats();
  res.json(summary);
};

export const getViewsByCountry = async (req: Request, res: Response) => {
  const data = await viewModel.aggregate([
    { $group: { _id: '$country', count: { $sum: 1 } } },
    { $project: { country: '$_id', count: 1 } }
  ]);
  res.json(data);
}