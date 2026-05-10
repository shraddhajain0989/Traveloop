import { useAuth } from "@/app/providers/AuthProvider";

export function useSignup() {
  const { signup } = useAuth();
  return { signup };
}

