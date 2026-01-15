import React from "react";

type Props = { count: number };

export default function StatsBadge({ count }: Props) {
  return (
    <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Products: {count}</span>
  );
}
