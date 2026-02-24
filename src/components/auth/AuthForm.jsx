export default function AuthForm({
  fields,
  submitLabel,
  onSubmit,
  footer
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {fields.map((field) => (
        <input
          key={field.name}
          type={field.type}
          name={field.name}
          placeholder={field.placeholder}
          required
          className="w-full rounded-full border border-amber-200 bg-white/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
        />
      ))}

      <button
        type="submit"
        className="w-full py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-sm"
      >
        {submitLabel}
      </button>

      {footer && (
        <div className="text-sm text-center mt-4">
          {footer}
        </div>
      )}
    </form>
  );
}
