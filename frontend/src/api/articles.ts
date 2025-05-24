import axios from "./axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Article, ArticleResponse } from "../types/article";

export const fetchArticles = async (page: number): Promise<ArticleResponse> => {
  return await axios.get(`/api/articles?page=${page}`).then((res) => res.data);
};

export const fetchArticleById = async (id: string): Promise<Article> => {
  const res = await axios.get(`/api/articles/${id}`);
  return res.data;
};

export const incrementView = async (id: string): Promise<Article> => {
  const res = await axios.patch(`/api/articles/${id}/view`);
  return res.data;
};

export const createArticle = async (data: Omit<Article, "_id">): Promise<Article> => {
  const res = await axios.post(`/api/articles`, data);
  return res.data;
};

export const useArticles = (page: number = 1) =>
  useQuery({queryKey: ["articles", page], queryFn: async () => {
    return fetchArticles(page)
  }});


export const useCreateArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["articles"]});
    }
  });
};

export const submitTimeSpentOnArticle = async (articleId: string, timeSpent: number) => {
  const res = await axios.post(`/api/articles/${articleId}/time-spent`, { timeSpent });
  return res.data;
};

export const useArticleById = (id: string) =>
    useQuery<Article>({
      queryKey: ["article", id],
      queryFn: () => fetchArticleById(id),
    });