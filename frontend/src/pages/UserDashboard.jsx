import { useEffect, useState } from "react";
import API from "../api/axios"; 

function UserDashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get("/note"); // ✅ updated route
      setNotes(res.data.notes);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);


  const createNote = async () => {
    try {
      setLoading(true);
      const res = await API.post("/note", form); 

      setNotes((prev) => [...prev, res.data.note]);
      setForm({ title: "", description: "" });

    } catch (err) {
      setError(err.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = async () => {
    try {
      await API.post("/auth/logout"); 
      localStorage.removeItem("role");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">

      
      <div className="flex justify-between items-center bg-white shadow px-8 py-4">
        <h1 className="text-xl font-bold text-gray-800">
          Notes App 📝
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      
      <div className="p-8">

        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Your Notes
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading && <p className="mb-4">Loading...</p>}

      
        {!loading && notes.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center mb-6">
            <p className="text-gray-500">
              No notes yet. Create one 👇
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold mb-2">
                  {note.title}
                </h3>

                <p className="text-gray-600 text-sm">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        )}

    
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
          <h3 className="text-lg font-semibold mb-4">
            Create Note
          </h3>

          <input
            className="w-full border p-2 rounded mb-3"
            placeholder="Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          <textarea
            className="w-full border p-2 rounded mb-3"
            placeholder="Description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            onClick={createNote}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
          >
            {loading ? "Adding..." : "Add Note"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;