import { useState } from 'react'
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const naviagte = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try{
            await axios.post("/auth/register", {username, password});
            naviagte("/login");
        }catch(err: Error | any){
            const msg = err.response?.data?.message || "Something went wrong";
            setError(msg);        }
        }

        return (
            <div className="min-h-screen flex items-center justify-center">
              <form
                onSubmit={submit}
                className="bg-white p-8 rounded shadow max-w-sm w-full"
              >
                <h2 className="text-2xl font-bold mb-4 text-center"> Sign Up</h2>
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Register
                </button>
                <p className="mt-4 text-center"><i>You already have an account? <Link to="/login" className="text-blue-600">Login</Link></i></p>
              </form>
            </div>
          );
}

export default Register