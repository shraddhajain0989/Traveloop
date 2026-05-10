import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/app/providers/AuthProvider";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { signupSchema } from "../schemas/signupSchema";

export function SignupForm() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({ mode: "onChange", resolver: zodResolver(signupSchema) });

  const onSubmit = async (values) => {
    await signup(values);
    navigate("/dashboard", { replace: true });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input error={errors.name?.message} id="name" label="Full name" {...register("name")} />
      <Input error={errors.email?.message} id="signup-email" label="Email" {...register("email")} />
      <Input error={errors.password?.message} id="signup-password" label="Password" type="password" {...register("password")} />
      <Button className="w-full" disabled={!isValid} isLoading={isSubmitting} type="submit">
        Create account
      </Button>
    </form>
  );
}

