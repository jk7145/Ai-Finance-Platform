"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center px-4">
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <h2 className="text-xl font-semibold text-gray-800">
        Something went wrong loading your dashboard
      </h2>
      <p className="text-gray-500 max-w-md">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  );
}
