import { Avatar } from "@/shared/components/ui/Avatar";
import { Card } from "@/shared/components/ui/Card";

export function ProfileHeader({ user }) {
  return (
    <Card className="overflow-hidden p-6">
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-brand-500 to-accent-cyan opacity-90" />
      <div className="relative mt-10 flex items-center gap-4">
        <Avatar name={user?.name} />
        <div>
          <h1 className="text-2xl font-extrabold text-ink">{user?.name}</h1>
          <p className="text-sm text-slate-500">{user?.email}</p>
        </div>
      </div>
    </Card>
  );
}
