export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 section-shell">
      <div className="w-full max-w-md card-surface rounded-2xl p-8">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
          ॐ
        </div>
        <h1 className="text-2xl font-semibold text-center text-amber-900 mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
