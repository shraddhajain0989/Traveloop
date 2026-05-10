import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export function ProfileForm({ user }) {
  return (
    <form className="grid gap-4">
      <Input defaultValue={user?.name} id="profile-name" label="Name" />
      <Input defaultValue={user?.email} id="profile-email" label="Email" type="email" />
      <Button>Save profile</Button>
    </form>
  );
}

