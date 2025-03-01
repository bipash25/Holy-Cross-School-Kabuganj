import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

const ErrorMessage = ({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorMessageProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto",
        className,
      )}
    >
      <div className="text-red-500 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="bg-primary hover:bg-primary/90">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
