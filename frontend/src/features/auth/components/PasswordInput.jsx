import { Input } from "@/shared/components/ui/Input";

export function PasswordInput(props) {
  return <Input autoComplete="current-password" type="password" {...props} />;
}

