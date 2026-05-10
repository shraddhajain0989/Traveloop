import { Button } from "@/shared/components/ui/Button";

export function DangerZone() {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-5">
      <h2 className="font-extrabold text-red-900">Danger zone</h2>
      <p className="mt-1 text-sm text-red-700">Account deletion can be connected after backend auth is finalized.</p>
      <Button className="mt-4" variant="danger">Delete account</Button>
    </div>
  );
}

