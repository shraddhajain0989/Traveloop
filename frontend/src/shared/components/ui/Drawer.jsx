export function Drawer({ children, isOpen }) {
  if (!isOpen) return null;
  return <aside className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white p-6 shadow-glow">{children}</aside>;
}

