import { Link } from "react-router-dom";
import { AuthBanner } from "../components/AuthBanner";
import { LoginForm } from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <AuthBanner title="Welcome back! Sign in to continue" />
      <LoginForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        New to Traveloop?{" "}
        <Link className="font-bold text-brand-700 hover:text-brand-900" to="/signup">
          Create an account
        </Link>
      </p>
    </div>
  );
}
