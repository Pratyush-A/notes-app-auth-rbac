import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/login", form);

      const role = res.data.role;
      localStorage.setItem("role", role);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* Title */}
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h1>

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          <input
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Redirect */}
          <p className="text-sm text-center text-gray-500 mt-2">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/signup")}
            >
              Signup
            </span>
          </p>

          {/* Optional Admin Signup */}
          <p className="text-xs text-center text-gray-400">
            Admin?{" "}
            <span
              className="text-red-500 cursor-pointer hover:underline"
              onClick={() => navigate("/admin-signup")}
            >
              Signup here
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;