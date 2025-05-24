import { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const CreateArticle = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/articles", { title, body, user});
      navigate("/");
    } catch {
      setError("Failed to create article.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">📝 Create Article</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            className="w-full border border-gray-300 p-2 rounded h-40 resize-none"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
            required
          />
          <button
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            type="submit"
          >
            Create Article
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateArticle;
