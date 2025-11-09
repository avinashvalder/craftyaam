"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./Button";
import { Toast } from "./Toast";
import { validateEmail } from "@/lib/utils";

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
        message: "Thanks! We’ve added you to the list 🎉",
      });
      setShowToast(true);
    } catch (error) {
      console.error("Notify form error:", error);
      setFormState({
        ...formState,
        status: "error",
        message: "Something went wrong. Please try again.",
      });
      setShowToast(true);
    }
  };

  const handleRetry = () => {
    setShowToast(false);
    setFormState((prev) => ({ ...prev, status: "idle", message: "" }));
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
        <Toast
          message={formState.message}
          type="success"
          duration={5000}
          onClose={handleCloseToast}
        />
      )}

      {showToast && formState.status === "error" && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
          <div className="flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg bg-red-50 border-red-500">
            <AlertCircle
              className="shrink-0 w-5 h-5 mt-0.5 text-red-500"
              aria-hidden="true"
            />

            <div
              className="flex-1 text-sm font-medium text-red-800"
              role="alert"
              aria-live="polite"
            >
              {formState.message}{" "}
              <button
                onClick={handleRetry}
                className="underline font-semibold hover:no-underline focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded"
              >
                Retry
              </button>
            </div>

            <button
              onClick={handleCloseToast}
              className="shrink-0 p-1 rounded-md transition-colors duration-200 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 text-red-500"
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
