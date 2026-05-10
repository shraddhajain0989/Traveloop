import { Link } from "react-router-dom";
import { Card } from "@/shared/components/ui/Card";
import { AuthBanner } from "../components/AuthBanner";
import { SignupForm } from "../components/SignupForm";

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md p-8">
      <AuthBanner title="Create workspace" description="Start with a secure, JWT-ready demo account." />
      <SignupForm />
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link className="font-bold text-brand-700 hover:text-brand-900" to="/login">
          Sign in
        </Link>
      </p>
    </Card>
  );
}

