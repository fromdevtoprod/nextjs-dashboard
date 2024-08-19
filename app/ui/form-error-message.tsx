export default function FormErrorMessage({ message }: { message: string }) {
  return (
    <div id="error-message" aria-live="polite" aria-atomic="true">
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
    </div>
  );
}
