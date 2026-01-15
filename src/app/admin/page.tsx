"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminPage from '../../components/Admin/AdminPage';

export default function Page() {
  const [ok, setOk] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        const data = await res.json();
        if (!mounted) return;
        if (data?.authenticated) setOk(true);
        else {
          setOk(false);
          router.replace('/admin/login');
        }
      } catch (err) {
        setOk(false);
        router.replace('/admin/login');
      }
    })();
    return () => { mounted = false; };
  }, [router]);

  if (ok === null) return <div className="p-6">Checking authentication...</div>;
  if (ok === false) return null;
  return <AdminPage />;
}
