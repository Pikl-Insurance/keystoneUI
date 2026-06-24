"use client";

import { DesignSystemView } from "@/components/components-page";

export default function ComponentsRoute() {
  return (
    <div className="relative grid min-h-0 flex-1 overflow-hidden grid-cols-[1fr_300px]">
      <DesignSystemView />
    </div>
  );
}
