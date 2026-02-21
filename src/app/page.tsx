import HeroSection from "@/components/sections/HeroSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ResourcesSection from "@/components/sections/ResourcesSection";
import CTASection from "@/components/sections/CTASection";

export default function Home() {
    return (
        <>
            <HeroSection />
            <ServicesGrid />
            <ProjectShowcase />
            <ResourcesSection />
            <CTASection />
        </>
    );
}
