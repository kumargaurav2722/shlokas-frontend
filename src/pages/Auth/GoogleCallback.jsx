import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";
import useAuth from "../../hooks/useAuth";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      loginUser(token);
      navigate("/");
      return;
    }
    setError("Google sign-in failed. Please try again.");
  }, [loginUser, navigate]);

  return (
    <AuthLayout title="Signing you in">
      {error ? (
        <div className="text-sm text-red-600 text-center">{error}</div>
      ) : (
        <div className="text-sm text-muted text-center">
          Completing Google sign-in...
        </div>
      )}
    </AuthLayout>
  );
}
