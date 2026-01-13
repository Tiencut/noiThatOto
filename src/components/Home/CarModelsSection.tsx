"use client";
import React, { useEffect, useState } from 'react';

export default function CarModelsSection() {
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    fetch('/data/car-models.json')
      .then((r) => r.json())
      .then(setModels)
      .catch(() => setModels([]));
  }, []);

  return (
    <section className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Model xe</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
        {models.map((m) => (
          <a key={m} href={`/car-models/${encodeURIComponent(m)}`} className="p-3 bg-white rounded shadow-sm text-center hover:shadow-md">{m}</a>
        ))}
      </div>
    </section>
  );
}