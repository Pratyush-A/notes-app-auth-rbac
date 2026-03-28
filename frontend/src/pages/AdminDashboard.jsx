import { useEffect, useState } from "react";
import API from "../api/axios";

function AdminDashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await API.get("/note/all"); // ✅ updated
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

  
  const deleteNote = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/note/${id}`); 

      
      setNotes((prev) => prev.filter((note) => note._id !== id));

    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  
  const handleLogout = async () => {
    try {
      await API.post("/auth/logout"); // ✅ updated
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
          Admin Dashboard 👑
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
          All Notes
        </h2>

        
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        
        {loading ? (
          <p>Loading...</p>
        ) : notes.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">No notes available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-bold text-lg mb-2">
                  {note.title}
                </h3>

                <p className="text-gray-600 mb-3">
                  {note.description}
                </p>

                
                <div className="text-xs text-gray-400 mb-3">
                  Created by: {note.user_id?.username || "Unknown"}
                </div>

                
                <button
                  onClick={() => deleteNote(note._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;