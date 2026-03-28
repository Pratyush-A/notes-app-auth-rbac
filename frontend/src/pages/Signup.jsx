import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Signup() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await API.post("/auth/register", {
        ...form,
        role: "user"
      });

      alert("Signup successful");
      navigate("/");

    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <div className="p-10">
      <h1>User Signup</h1>

      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })}/>
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })}/>
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })}/>

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;