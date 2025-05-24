import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ArticleList from "../features/articles/ArticleList";
import ArticleView from "../features/articles/ArticleView";
import CreateArticle from "../features/articles/CreateArticle";
import Dashboard from "../features/analytics/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Login from "../features/auth/Login";
import Register from "../features/auth/Register";
import Layout from "../components/Layout";
import UserManagement from "../features/admin/UserManagement";
import NotFound from "../pages/Notfound";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout><ArticleList /></Layout>} />
      <Route path="/article/:id" element={<Layout><ArticleView /></Layout>} />
      <Route path="/create-article" element={<Layout><PrivateRoute requiredRole="author"><CreateArticle /></PrivateRoute></Layout>} />
      <Route path="/dashboard" element={<Layout><PrivateRoute requiredRole="admin"><Dashboard /></PrivateRoute></Layout>} />
      <Route path="/login" element={<Layout><Login /></Layout>} />
      <Route path="/register" element={<Layout><Register /></Layout>} />
      <Route path="/admin/users" element={<Layout><PrivateRoute requiredRole="admin"><UserManagement /></PrivateRoute></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  </Router>
);

export default AppRoutes;