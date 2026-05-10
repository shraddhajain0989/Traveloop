import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { useToast } from "@/shared/hooks/useToast";

export function ForgotPasswordForm() {
  const { showToast } = useToast();
  const { handleSubmit, register } = useForm();

  const onSubmit = () => {
    showToast({
      type: "success",
      title: "Reset link queued",
      description: "The future backend will send a secure password reset email.",
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input id="forgot-email" label="Email" type="email" {...register("email")} />
      <Button className="w-full" type="submit">
        Send reset link
      </Button>
    </form>
  );
}

