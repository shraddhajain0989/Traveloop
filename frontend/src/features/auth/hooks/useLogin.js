import { useAuth } from "@/app/providers/AuthProvider";

export function useLogin() {
  const { login } = useAuth();
  return { login };
}

