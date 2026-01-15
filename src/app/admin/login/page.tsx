"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Login failed');
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Admin Login</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-xs text-gray-600">Password</label>
          <input type="password" className="w-full mt-1 border rounded px-3 py-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error ? <div className="text-sm text-red-600">{error}</div> : null}
        <div className="flex gap-2">
          <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded" type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
