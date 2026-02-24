import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";
import { api } from "../../services/api";
import { login } from "../../services/auth.service";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [error, setError] = useState("");
  const googleUrl = `${api.defaults.baseURL}/auth/google/start?next=${encodeURIComponent(window.location.origin + "/auth/google/callback")}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setError("");
      const res = await login(email, password);
      loginUser(res.data.access_token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthLayout title="Sign In">
      <a
        href={googleUrl}
        className="mb-4 w-full inline-flex items-center justify-center gap-2 rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm font-semibold text-amber-900 shadow-sm hover:bg-white"
      >
        Continue with Google
      </a>

      {error && (
        <div className="mb-4 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
      <AuthForm
        fields={[
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" }
        ]}
        submitLabel="Sign In"
        onSubmit={handleSubmit}
        footer={
          <>
            <Link to="/forgot-password" className="underline">
              Forgot password?
            </Link>
            <br />
            <Link to="/signup" className="underline">
              Create an account
            </Link>
          </>
        }
      />
    </AuthLayout>
  );
}
