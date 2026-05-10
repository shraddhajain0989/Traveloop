import { ErrorState } from "./ErrorState";

export function RetryState({ onRetry }) {
  return <ErrorState message="The request failed, but you can try again." onRetry={onRetry} />;
}

