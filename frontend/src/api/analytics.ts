import axios from "./axios";
import { useQuery } from "@tanstack/react-query";
import { Article } from "../types/article";
import { CountryData } from "../types/countryData";

export interface Summary {
    totalArticles: number;
    totalViews: number;
    mostViewedArticle?: Article | null;
}

export const fetchTopArticles = async (): Promise<Article[]> => {
    const res = await axios.get('/api/analytics/top');
    return res.data;
}

export const fetchSummary = async (): Promise<Summary> => {
    const res = await axios.get("/api/analytics/summary");
    return res.data;
}

export const fetchViewsByCountry = async (): Promise<CountryData[]> => {
  const res = await axios.get("/api/analytics/views-by-country");
  return res.data;
}

export const useTopArticles = () =>
    useQuery<Article[]>({
      queryKey: ["top-articles"],
      queryFn: fetchTopArticles,
    });
  
  export const useSummary = () =>
    useQuery<Summary>({
      queryKey: ["summary"],
      queryFn: fetchSummary,
    });

  export const useViewsByCountry = () => {
    return useQuery<CountryData[]>({
      queryKey: ['viewsByCountry'],
      queryFn: fetchViewsByCountry
    }) 
  }