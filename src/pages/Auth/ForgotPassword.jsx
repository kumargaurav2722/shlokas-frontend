import AuthLayout from "../../components/auth/AuthLayout";
import AuthForm from "../../components/auth/AuthForm";

export default function ForgotPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link will be sent (backend later)");
  };

  return (
    <AuthLayout title="Reset Password">
      <AuthForm
        fields={[
          { name: "email", type: "email", placeholder: "Email" }
        ]}
        submitLabel="Send Reset Link"
        onSubmit={handleSubmit}
      />
    </AuthLayout>
  );
}
