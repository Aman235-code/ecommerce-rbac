import React from "react";

export default function Pagination({ page, setPage, pageSize, total }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        className="px-3 py-1 border rounded"
        disabled={page <= 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </button>
      <div>
        {page} / {pages}
      </div>
      <button
        className="px-3 py-1 border rounded"
        disabled={page >= pages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>
    </div>
  );
}
