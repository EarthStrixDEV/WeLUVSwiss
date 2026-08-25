import { Footer } from "@/components/Footer";
import { Hero } from "@/components/landing/Hero";
import { History } from "@/components/landing/History";
import { StyleCards } from "@/components/landing/StyleCards";
import { Carousel } from "@/components/landing/Carousel";
import { Gallery } from "@/components/landing/Gallery";
import { CatalogTabs } from "@/components/landing/CatalogTabs";
import { RecommendationMap } from "@/components/landing/RecommendationMap";
import { About } from "@/components/landing/About";

// Landing page (spec §4.1). Server component — interactivity lives in the
// 'use client' islands under components/landing/ (Carousel, CatalogTabs, and
// the MapExplorer used by RecommendationMap).
export default function Home() {
  return (
    <>
      <Hero />
      <History />
      <StyleCards />
      <Carousel />
      <Gallery />
      <CatalogTabs />
      <RecommendationMap />
      <About />
      <Footer variant="full" />
    </>
  );
}
