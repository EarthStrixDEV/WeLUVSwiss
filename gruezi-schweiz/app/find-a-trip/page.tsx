// Find a Trip page (spec §4.5). The search hero, filter panel and results all
// share one piece of client state, so that whole flow is a single island
// (TripFinder, which also renders the floating Header over its hero scene —
// see components/landing/Hero.tsx for the same pattern). Cross-links and
// footer stay server-rendered.
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { CrossLinks } from "@/components/CrossLinks";
import { TripFinder } from "./TripFinder";

export const metadata: Metadata = {
  title: "Find a Trip",
  description:
    "Start with a month and a budget rather than a place — filter sample Swiss trips by season, length, budget and style.",
};

const BUDGET_NOTE = "Daily budgets are sample estimates.";

export default function FindATripPage() {
  return (
    <>
      <TripFinder />

      <CrossLinks
        eyebrow="Or start somewhere else"
        items={[
          {
            icon: "M3 20l6-13 4 8 3-5 5 10z",
            title: "Browse by region",
            body: "Maps, landmarks and routes, one valley at a time",
            href: "/regions/bernese-oberland",
          },
          {
            icon: "M4 4h16v12H4zM4 10h16M8 20l2-3M16 20l-2-3",
            title: "Work out the rail pass first",
            body: "It often decides how far apart your stops should be",
            href: "/rail-passes",
          },
          {
            icon: "M6 21V9l6-5 6 5v12M10 21v-6h4v6",
            title: "Beds for your group",
            body: "Allocate dorms and private rooms by head count",
            href: "/hostels",
          },
        ]}
      />

      <Footer variant="slim" note={BUDGET_NOTE} />
    </>
  );
}
