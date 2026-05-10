import { Button } from "./Button";

export function Pagination({ page, pageCount, setPage }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <Button disabled={page <= 1} onClick={() => setPage(page - 1)} variant="secondary">
        Previous
      </Button>
      <span className="text-sm font-semibold text-slate-600">
        Page {page} of {pageCount}
      </span>
      <Button disabled={page >= pageCount} onClick={() => setPage(page + 1)} variant="secondary">
        Next
      </Button>
    </div>
  );
}

