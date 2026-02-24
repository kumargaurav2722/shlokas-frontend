import { useState } from "react";
import { api } from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await api.post("/auth/login", null, {
      params: { email, password },
    });
    localStorage.setItem("token", res.data.access_token);
    alert("Logged in!");
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" type="password"
             onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
