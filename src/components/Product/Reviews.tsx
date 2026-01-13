import React from 'react';

export default function Reviews({ reviews }: { reviews: string[] }) {
  if (!reviews || reviews.length === 0) return null;
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h4 className="font-semibold mb-2">Top reviews</h4>
      <ul className="text-sm list-disc pl-5 space-y-1">
        {reviews.slice(0, 5).map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
