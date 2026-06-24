"use client";

import { BookingEnginePage } from "@/components/booking-engine-page";

export default function BookingEngineRoute() {
  return (
    <div className="min-h-0 min-w-0 overflow-hidden">
      <section className="h-full overflow-y-auto px-20 py-12 xl:px-24 xl:py-14">
        <BookingEnginePage />
      </section>
    </div>
  );
}
