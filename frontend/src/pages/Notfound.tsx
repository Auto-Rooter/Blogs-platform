import { Link } from "react-router-dom";

const Notfound = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center p-6">
          <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-500 mb-6">
            Sorry, the page you are looking for does not exist.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            ← Back to Home
          </Link>
        </div>
      );
}

export default Notfound