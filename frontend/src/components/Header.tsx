import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogout = () => {
      logout();
      navigate("/");
    };
    const { user, logout } = useAuth();
    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <div className="flex gap-4 items-center">
        <Link to="/" className="font-bold text-lg">Blogs123</Link>
        {user && (
            <>
              <Link to="/" className="hover:underline">Articles</Link>
              {
                user?.role === "author" && (<Link to="/create-article" className="hover:underline">New Article</Link>)
              }
              {
                user?.role === "admin" && (
                  <>
                    <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    <Link to="/admin/users" className="hover:underline">Users</Link>
                  </>
                )
              }
            </>
        )}
        </div>
        <div>
        {user ? (
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded">
            Logout
            </button>
        ) : isLogin ? (
            <Link to="/register" className="hover:underline">Register</Link>
        ): isRegister ?
        (
          <Link to="/login" className="hover:underline">Login</Link>
        ): (<Link to="/login" className="hover:underline">Login</Link>)
        }
        </div>
    </nav>
  )
}

export default Header