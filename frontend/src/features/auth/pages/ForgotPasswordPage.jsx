import { Link } from "react-router-dom";
import { Card } from "@/shared/components/ui/Card";
import { AuthBanner } from "../components/AuthBanner";
import { ForgotPasswordForm } from "../components/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md p-8">
      <AuthBanner title="Recover access" description="Request a secure reset flow for your account." />
      <ForgotPasswordForm />
      <Link className="mt-6 block text-center text-sm font-bold text-brand-700" to="/login">
        Back to login
      </Link>
    </Card>
  );
}

