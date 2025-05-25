import axios from "../../api/axios";
import { useQueryClient  } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

const DeleteArticle = ({articleId, isAdmin}: {articleId: string, isAdmin: boolean}) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const isItTheArticlePage = location.pathname === "/";
    const deleteButtonContent = isItTheArticlePage ? "❌" : "Delete Article";

    const handleDelete = async () => {
        if (!window.confirm(`Are you sure you want to delete this article?`)) return;
        await axios.delete(`/api/articles/${articleId}`);
        queryClient.invalidateQueries({ queryKey: ["articles"] });
        if (!isItTheArticlePage) {navigate("/")}
    }
  return (
    <>
    {isAdmin && (
        <button
        onClick={() => handleDelete()}
        className="text-red-500 hover:underline"
        >
        {deleteButtonContent}
        </button>
    )}
    </>
  )
}

export default DeleteArticle