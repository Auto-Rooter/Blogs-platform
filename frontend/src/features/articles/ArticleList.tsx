import axios from "../../api/axios";
import { useState } from "react";
import { useArticles } from "../../api/articles";
import { Link } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContext";
import { Article, ArticleResponse } from "../../types/article";

const ArticleList = () => {
  const [page, setPage] = useState(1);
    const { data , isLoading } = useArticles(page);
    const queryClient = new QueryClient();
    const { user } = useAuth();
    const isAuthor = user?.role === 'author';
    const isAdmin = user?.role === 'admin';


    if (isLoading) return <p>Loading...</p>;

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        await axios.delete(`/api/articles/${id}`);
        queryClient.invalidateQueries({ queryKey: ["articles"] });
    }
    return (
        <div>
        {user && isAuthor && (
            <div className="mb-4">
                <Link to="/create-article" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                ➕ Create New Article
                </Link>
            </div>
        )}
          <h1 className="text-2xl font-bold mb-6">📚 Articles</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data?.articles || []).map((article: Article) => (
              <div key={article._id} className="bg-white p-4 rounded shadow hover:shadow-md transition">
                <Link to={`/article/${article._id}`}>
                    <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    <p className="text-gray-600 text-sm mb-2">
                        {article.body.substring(0, 100)}...
                    </p>
                    <i className="text-xs text-gray-400">
                        Created: {new Date(article.createdAt).toLocaleDateString()}
                    </i>
                    </Link>
                    <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span>👁️ {article.views} views</span>
                    {user && isAdmin && (
                        <button
                        onClick={() => handleDelete(article._id)}
                        className="text-red-500 hover:underline"
                        >
                        Delete
                        </button>
                    )}
                    </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-6">
            <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50" 
              onClick={() => setPage((p) => p - 1)}
              disabled={page <= 1}
            >
              Back
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {data?.totalPages}
            </span>
            <button className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50" 
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= (data?.totalPages || 1)}
            >
              Next
            </button>
          </div>
        </div>
      );
}

export default ArticleList;