import { HeroSection } from "@/components/home/HeroSection";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { Footer } from "@/components/layout/Footer";
import { StreamingMetricsClient } from "@/components/home/StreamingMetricsClient";
import { HowToSection } from "@/components/home/HowToSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="[content-visibility:auto] [contain-intrinsic-size:1px_4000px]">
        <StreamingMetricsClient />
        <AboutSection />
        <ServicesSection />
        <ArticlesSection />
        <HowToSection></HowToSection>
        <Footer></Footer>
      </div>
    </>
  );
}
