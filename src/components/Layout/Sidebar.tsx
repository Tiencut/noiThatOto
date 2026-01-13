import React from 'react';
import FilterPanel from '../Filter/FilterPanel';

export default function Sidebar({ onApply }: { onApply: (filters: any) => void }) {
  return (
    <aside>
      <FilterPanel onApply={onApply} />
    </aside>
  );
}
