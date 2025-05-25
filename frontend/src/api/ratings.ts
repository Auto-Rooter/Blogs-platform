import axios from "./axios";

export const rateArticle = async (articleId: string, rating: number, fingerprint: string) => {
    await axios.post(`/api/ratings/${articleId}/rate`, { rating, fingerprint });
}