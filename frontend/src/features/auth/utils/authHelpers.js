export function sanitizeAuthRedirect(pathname) {
  return pathname?.startsWith("/") ? pathname : "/dashboard";
}

