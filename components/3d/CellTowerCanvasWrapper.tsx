'use client';

import dynamic from 'next/dynamic';

const CellTowerCanvas = dynamic(() => import('./CellTowerCanvas'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 z-0 bg-black" aria-hidden="true" />,
});

export default function CellTowerCanvasWrapper() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <CellTowerCanvas />
    </div>
  );
}
