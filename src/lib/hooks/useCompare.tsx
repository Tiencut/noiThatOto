"use client";
import { useEffect, useState } from "react";

const KEY = "compare_ids";

export default function useCompare() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw));
    } catch (e) {
      setIds([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch (e) {}
  }, [ids]);

  function add(id: string) {
    setIds((s) => (s.includes(id) ? s : [...s, id]));
  }

  function remove(id: string) {
    setIds((s) => s.filter((x) => x !== id));
  }

  function toggle(id: string) {
    setIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  function clear() {
    setIds([]);
  }

  function contains(id: string) {
    return ids.includes(id);
  }

  return { ids, add, remove, toggle, clear, contains };
}
