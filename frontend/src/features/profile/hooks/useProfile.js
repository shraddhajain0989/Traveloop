import { useAuth } from "@/app/providers/AuthProvider";

export function useProfile() {
  const { user } = useAuth();
  return { user };
}

