import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useArticleById, submitTimeSpentOnArticle } from '../../api/articles';
import { submitView } from '../../api/views';
import { useAuth } from "../../context/AuthContext";
import RatingComponent from "../../components/RatingComponent";
import DeleteArticle from "./DeleteArticle";
import { getFingerprint } from "../../hooks/useFingerprint";

const ArticleView = () => {
    const { id } = useParams<{ id: string }>() as { id: string };
        const { user } = useAuth();
    const { data: article, isLoading, isError } = useArticleById(id);
    const [error, setError] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const navigate = useNavigate();
    const isAdmin = user?.role === 'admin';

    // TODO: Find a way to log the view when user not agree on GDPR
    useEffect(() => {
      const logView = async () => {
        // const consent = localStorage.getItem("gdpr-consent");
        // if (consent !== "true") return;
        const fingerprint = await getFingerprint();
        try {
          await submitView({articleId: id,fingerprint});
        } catch (e) {
          console.error("View logging failed", e);
        }
      };
    
      if (id) {
        logView();
        setStartTime(Date.now());
      }
    }, [id]);
    
    useEffect(() => {
      if (isError) {
        setError(true);
        navigate("/404");
      }
    }, [isError]);

    useEffect(() => {
      return () => {
        if(!isAdmin && startTime && article?._id) {
          const timeSpent = Math.floor((Date.now() - startTime) / 1000);
          submitTimeSpentOnArticle(article._id, timeSpent);
        }
      }
    }, [startTime, article?._id, isAdmin]);
    if (isLoading || error || !article) return null;

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          <div className='flex items-baseline justify-between mb-6'>
            <p className="text-gray-500 mb-6">👁️ {article.views} views</p>
            <DeleteArticle isAdmin={isAdmin} articleId={article._id}/>
          </div>
          <div className="text-lg leading-relaxed">{article.body}</div>
          <RatingComponent articleId={article._id}/>
        </div>
      );
}

export default ArticleView