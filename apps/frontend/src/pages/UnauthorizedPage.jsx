import React from "react";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center px-4">
      <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700 text-lg">
        You don’t have permission to view this page.
      </p>
    </div>
  );
}
