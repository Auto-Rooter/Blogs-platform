import { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const handleLogout = () => {
      logout();
      navigate("/");
    };
    const { user, logout } = useAuth();
    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/register";

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="font-bold text-lg">
        Blogs123
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        {user && (
          <>
            <Link to="/" className="hover:underline">
              Articles
            </Link>
            {user.role === "author" && (
              <Link to="/create-article" className="hover:underline">
                New Article
              </Link>
            )}
            {user.role === "admin" && (
              <>
                <Link to="/dashboard" className="hover:underline">
                  Dashboard
                </Link>
                <Link to="/admin/users" className="hover:underline">
                  Users
                </Link>
              </>
            )}
          </>
        )}
      </div>

      {/* Authentication Button / Mobile Toggle */}
      <div className="flex items-center">
        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
            >
              Logout
            </button>
          ) : isLogin ? (
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          ) : (
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden ml-4 p-2 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {open && (
      <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
        {user && (
          <>
            <Link
              to="/"
              className="block hover:underline"
              onClick={() => setOpen(false)}
            >
              Articles
            </Link>
            {user.role === "author" && (
              <Link
                to="/create-article"
                className="block hover:underline"
                onClick={() => setOpen(false)}
              >
                New Article
              </Link>
            )}
            {user.role === "admin" && (
              <>
                <Link
                  to="/dashboard"
                  className="block hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/admin/users"
                  className="block hover:underline"
                  onClick={() => setOpen(false)}
                >
                  Users
                </Link>
              </>
            )}
          </>
        )}
        {/* Auth links/buttons */}
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full text-left px-2 py-1 bg-red-500 rounded"
          >
            Logout
          </button>
        ) : isLogin ? (
          <Link
            to="/register"
            className="block hover:underline"
            onClick={() => setOpen(false)}
          >
            Register
          </Link>
        ) : (
          <Link
            to="/login"
            className="block hover:underline"
            onClick={() => setOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    )}
  </nav>
  )
}

export default Header