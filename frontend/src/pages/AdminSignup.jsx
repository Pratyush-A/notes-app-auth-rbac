import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function AdminSignup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      await API.post("/auth/register", {
        ...form,
        role: "admin"
      });

      alert("Admin registered successfully 👑");
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
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
          Admin Registration 👑
        </h1>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 mb-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-4">

          <input
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* Button */}
          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Creating Admin..." : "Signup as Admin"}
          </button>

          {/* Redirect */}
          <p className="text-sm text-center text-gray-500 mt-2">
            Already have an account?{" "}
            <span
              className="text-purple-500 cursor-pointer hover:underline"
              onClick={() => navigate("/")}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default AdminSignup;