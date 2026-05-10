import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { useToast } from "@/app/providers/ToastProvider";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { loginSchema } from "../schemas/loginSchema";
import { PasswordInput } from "./PasswordInput";

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      await login(values);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      showToast({
        title: "Login failed",
        description: error.message || "Please check your email and password.",
      });
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400" size={18} />
        <Input className="pl-12" error={errors.email?.message} id="email" placeholder="Email Address" {...register("email")} />
      </div>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-400" size={18} />
        <PasswordInput className="pl-12" error={errors.password?.message} id="password" placeholder="Password" {...register("password")} />
      </div>
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input className="h-3.5 w-3.5 rounded border-slate-300 text-brand-500 focus:ring-brand-500" type="checkbox" />
          Remember me
        </label>
        <Link className="font-semibold text-brand-700 hover:text-brand-900" to="/forgot-password">
          Forgot password?
        </Link>
      </div>
      <Button className="w-full" disabled={!isValid} isLoading={isSubmitting} type="submit">
        Sign in
      </Button>
      <div className="flex items-center gap-3 py-4 text-xs text-slate-400">
        <span className="h-px flex-1 bg-slate-200" />
        Or continue with
        <span className="h-px flex-1 bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary">Google</Button>
        <Button variant="secondary">Apple</Button>
      </div>
    </form>
  );
}
