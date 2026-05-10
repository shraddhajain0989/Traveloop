import { ErrorBoundary } from "@/shared/components/feedback/ErrorBoundary";
import { AppRouter } from "@/app/router/AppRouter";

function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  );
}

export default App;
