import { Request, Response } from "express";
import ViewModel from "../models/view.model";
import ArticleModel from "../models/article.model";
import geoip from "geoip-lite";
import mongoose from "mongoose";

export const trackView = async (req: Request, res: Response) => {
  const { articleId, fingerprint } = req.body;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    res.status(400).json({ message: "Invalid article ID" });
    return;
}

  const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "") as string;
  const geo = geoip.lookup(ip);
  const country = geo?.country || "Unknown";

  const exists = await ViewModel.findOne({ articleId, fingerprint });
  if (exists){ 
    res.status(200).json({ message: "Already viewed" });
    return;
  }

  await ViewModel.create({ articleId, fingerprint, ip, country });
  await ArticleModel.findByIdAndUpdate(articleId, { $inc: { views: 1 } });
  res.status(201).json({ message: "View recorded" });
};
