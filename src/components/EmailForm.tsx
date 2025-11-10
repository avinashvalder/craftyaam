"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { validateEmail } from "~/lib/utils";

interface EmailFormProps {
  onSuccess?: (email: string) => void;
  onError?: (error: string) => void;
}

interface FormState {
  email: string;
  status: "idle" | "submitting" | "success" | "error";
  message: string;
}

export const EmailForm: React.FC<EmailFormProps> = ({}) => {
  const [formState, setFormState] = useState<FormState>({
    email: "",
    status: "idle",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, email: e.target.value }));
    // Clear validation errors when user starts typing
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    const validation = validateEmail(formState.email);

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);

    setFormState((prev) => ({ ...prev, status: "submitting" }));
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formState.email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setFormState({
        email: "",
        status: "success",
        message: "All set! You'll hear from the CraftyAam crew soon",
      });
      setShowToast(true);
    } catch (error) {
      console.error("Notify form error:", error);
      setFormState({
        ...formState,
        status: "error",
        message: "Oops! The mango slipped. Try again in a bit?",
      });
      setShowToast(true);
    }
  };

  const handleCloseToast = () => {
    setShowToast(false);
    if (formState.status === "success") {
      setFormState((prev) => ({ ...prev, status: "idle", message: "" }));
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto"
        noValidate
      >
        <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
          <div className="flex-1">
            <input
              type="email"
              value={formState.email}
              onChange={handleEmailChange}
              placeholder="your@email.com"
              aria-label="Email address for launch notification"
              aria-invalid={validationErrors.length > 0}
              aria-describedby={
                validationErrors.length > 0 ? "email-error" : undefined
              }
              className={`w-full px-4 py-3 rounded-lg border-2 text-ink bg-white placeholder-ink/40 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-mango-yellow focus:ring-offset-2 ${
                validationErrors.length > 0
                  ? "border-red-500 focus:border-red-500"
                  : "border-mango-yellow/30 focus:border-mango-yellow"
              }`}
              disabled={formState.status === "submitting"}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={formState.status === "submitting"}
            disabled={formState.status === "submitting"}
            className="whitespace-nowrap sm:shrink-0"
          >
            Notify me
          </Button>
        </div>

        {validationErrors.length > 0 && (
          <div
            id="email-error"
            className="flex items-start gap-2 mt-2 text-red-600 text-sm"
            role="alert"
          >
            <AlertCircle
              className="w-4 h-4 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{validationErrors[0]}</span>
          </div>
        )}
      </form>

      {showToast && formState.status === "success" && (
        <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:max-w-md z-50 mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg bg-green-50 border-green-500">
            <svg
              className="shrink-0 w-5 h-5 mt-0.5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium text-green-800 wrap-break-word"
                role="alert"
                aria-live="polite"
              >
                {formState.message}
              </p>
            </div>

            <button
              onClick={handleCloseToast}
              className="shrink-0 p-1 rounded-md transition-colors duration-200 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-green-500"
              aria-label="Close notification"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {showToast && formState.status === "error" && (
        <div className="fixed top-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:right-auto sm:max-w-md z-50 mx-auto">
          <div className="flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg bg-red-50 border-red-500">
            <AlertCircle
              className="shrink-0 w-5 h-5 mt-0.5 text-red-500"
              aria-hidden="true"
            />

            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium text-red-800 wrap-break-word"
                role="alert"
                aria-live="polite"
              >
                {formState.message}
              </p>
            </div>

            <button
              onClick={handleCloseToast}
              className="shrink-0 p-1 rounded-md transition-colors duration-200 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-red-500"
              aria-label="Close notification"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
