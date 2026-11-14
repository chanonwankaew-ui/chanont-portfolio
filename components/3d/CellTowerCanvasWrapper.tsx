'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const CellTowerCanvas = dynamic(() => import('./CellTowerCanvas'), {
  loading: () => (
    <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#05070B]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#00F0FF] font-mono text-sm animate-pulse">Loading 3D Experience...</p>
      </div>
    </div>
  ),
  ssr: false,
});

export default function CellTowerCanvasWrapper() {
  return (
    <Suspense fallback={
      <div className="fixed inset-0 z-0 flex items-center justify-center bg-[#05070B]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#00F0FF] font-mono text-sm animate-pulse">Initializing 3D Scene...</p>
        </div>
      </div>
    }>
      <CellTowerCanvas />
    </Suspense>
  );
}