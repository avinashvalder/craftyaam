import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "mango";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  isLoading = false,
  className = "",
  disabled,
  ...props
}) => {
  // Organic rounded button with soft corners
  const baseClasses =
    "inline-flex items-center justify-center font-heading font-semibold cursor-pointer rounded-[3rem]";

  // Size variants
  const sizeClasses = {
    sm: "px-5 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg",
  };

  // Variant styles with organic colors
  const variantClasses = {
    primary:
      "bg-[#2d6a4f] text-white shadow-lg hover:bg-[#1b4332] hover:shadow-xl",
    secondary:
      "bg-transparent border-2 border-[#43aa8b] text-[#102a43] hover:bg-[#43aa8b]/10",
    mango:
      "bg-[#f9c74f] text-[#102a43] shadow-lg hover:bg-[#f8961e] hover:shadow-xl",
  };

  // Smooth transitions with scale effect
  const stateClasses =
    "transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#43aa8b]/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100";

  const isDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${stateClasses} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Ripening...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
