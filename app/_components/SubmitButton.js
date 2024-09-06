"use client";

import { useFormStatus } from "react-dom";

function SubmitButton({ children, loadingLabel, className }) {
  const { pending } = useFormStatus();

  return (
    <button
      className={`bg-accent-500 px-4 py-2 sm:px-8 sm:py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 ${className && ""}`}
      disabled={pending}
    >
      {pending ? loadingLabel : children}
    </button>
  );
}

export default SubmitButton;
