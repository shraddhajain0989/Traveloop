import { AlertTriangle } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";

export function ErrorState({ message = "Unable to load this view.", onRetry }) {
  return (
    <div className="rounded-xl border border-red-100 bg-red-50 p-6 text-red-800">
      <AlertTriangle size={22} />
      <h2 className="mt-3 text-lg font-extrabold">Something went wrong</h2>
      <p className="mt-1 text-sm">{message}</p>
      {onRetry && (
        <Button className="mt-4" onClick={onRetry} variant="danger">
          Retry
        </Button>
      )}
    </div>
  );
}

