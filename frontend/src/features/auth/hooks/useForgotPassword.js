export function useForgotPassword() {
  return {
    requestReset: async () => ({ ok: true }),
  };
}

