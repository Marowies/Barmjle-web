import ServicesGrid from "@/components/sections/ServicesGrid";
import CTASection from "@/components/sections/CTASection";

export default function ServicesPage() {
    return (
        <div>
            <div className="bg-slate-900 text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">خدمات برمجلي</h1>
                <p className="text-xl text-gray-300">كل ما تحتاجه للتميز في مسارك الأكاديمي والمهني</p>
            </div>
            <ServicesGrid />

            {/* Additional details could go here */}

            <CTASection />
        </div>
    );
}
