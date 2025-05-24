import { useTopArticles, useSummary } from "../../api/analytics";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import axios from '../../api/axios';

const Dashboard = () => {
  const { data: summary } = useSummary();
  const { data: top } = useTopArticles();

  const handleExport = async () => {
    try {
      const res = await axios.get("/api/articles/export", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `articles_${new Date().toUTCString()}.json`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Export failed", err);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("file", file);
  console.log("Importing file", file);
    try {
      await axios.post("/api/articles/import", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        }});
      alert("Articles imported successfully");
    } catch (err) {
      console.error("Import failed", err);
      alert("Import failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleExport}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            📤 Export Articles
          </button>

          <label className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
            📥 Import Articles
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>

        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Top Articles</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={top || []}>
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="views" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Articles Table</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2 border">Title</th>
              <th className="text-left p-2 border">Views</th>
              <th className="text-left p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {top?.map((article) => (
              <tr key={article._id}>
                <td className="border p-2">{article.title}</td>
                <td className="border p-2">{article.views}</td>
                <td className="border p-2 text-sm text-gray-500">
                    {new Date(article.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
