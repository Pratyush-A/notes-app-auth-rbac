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

      alert("Admin registered successfully");
      navigate("/");

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-6 rounded-xl shadow w-96">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Admin Signup 👑
        </h1>

        
        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-3 rounded text-sm">
            {error}
          </div>
        )}

        
        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          className="border p-2 w-full mb-4 rounded"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        
        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-purple-500 hover:bg-purple-600 text-white w-full p-2 rounded disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Signup as Admin"}
        </button>
      </div>
    </div>
  );
}

export default AdminSignup;