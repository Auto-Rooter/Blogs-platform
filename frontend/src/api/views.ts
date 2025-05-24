import axios from "./axios";

interface LogViewParams {
    articleId: string;
    fingerprint: string;
}

export const submitView = async ({articleId, fingerprint}: LogViewParams) => {
    const res = await axios.post("/api/views/", {articleId, fingerprint});
    return res.data;
}
