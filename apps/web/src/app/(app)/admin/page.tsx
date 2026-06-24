"use client";

import { Settings2 } from "lucide-react";

export default function AdminRoute() {
  return (
    <div className="flex h-full min-w-0 flex-1 items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/10 py-14 text-center px-6">
        <div className="grid size-12 place-items-center rounded-xl bg-muted text-muted-foreground">
          <Settings2 className="size-6" />
        </div>
        <div>
          <p className="text-sm font-medium">Admin</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Admin tools will be available here soon.
          </p>
        </div>
      </div>
    </div>
  );
}
