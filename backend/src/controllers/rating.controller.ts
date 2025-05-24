import { Request, Response } from "express";
import ArticleModel from "../models/article.model";
import mongoose from "mongoose";

export const submitRating = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { rating, fingerprint } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || ![1, 2, 3, 4, 5].includes(rating)) {
        res.status(400).json({ message: "Invalid input" });
        return;
    }

    const article = await ArticleModel.findById(id) as any;
    if (!article){ 
        res.status(404).json({ message: "Invalid input" });
        return;
    }

    if(article.ratedFingerprints?.includes(fingerprint)){
        res.status(400).json({ message: "Already rated" });
        return;
    }

    (article as any).ratings.push(rating);
    (article as any).ratedFingerprints = [...(article as any).ratedFingerprints || [], fingerprint];

    await article.save();
    res.status(200).json({ message: "Rating submitted" });
}