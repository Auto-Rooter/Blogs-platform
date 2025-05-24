import ArticleModel from "../models/article.model";
import { JsonFormatStrategy } from "./strategies/JsonFormatStrategy";
import { isValidArticle } from "../utils/ArticleValidator";

const formatStrategy = new JsonFormatStrategy();

export const getTopArticles = async (limit = 5) => {
  return ArticleModel.find().sort({ views: -1 }).limit(limit);
};

export const getArticleStats = async () => {
  const totalArticles = await ArticleModel.countDocuments();
  const totalViews = await ArticleModel.aggregate([
    { $group: { _id: null, total: { $sum: "$views" } } }
  ]);

  return {
    totalArticles,
    totalViews: totalViews[0]?.total || 0,
  };
};

export const exportArticles = async () => {
  console.log("Exporting articles...333");
  const articles = await ArticleModel.find();
  return formatStrategy.export(articles);
}


export const importArticles = async (content: string) => {
  const articles = await formatStrategy.import(content);

  const cleaned = articles.filter((article) => isValidArticle(article))
                      .map((article) => ({
                            title: article.title,
                            body: article.body,
                            views: article.views || 0,
                          }));
  if(!cleaned){
    throw new Error("No valid articles found in the uploaded file.");
  }
  
  return ArticleModel.insertMany(cleaned);
}