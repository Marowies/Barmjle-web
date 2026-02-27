import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const cairo = Cairo({ subsets: ["arabic"] });

export const metadata: Metadata = {
    title: "Barmajni | برمجلي",
    description: "خدمات برمجية لطلاب الجامعات - مشاريع تخرج، كورسات، استشارات",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ar" dir="rtl" className="scroll-smooth">
            <body className={`${cairo.className} antialiased min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col`}>
                <Navbar />
                <main className="flex-grow pt-16">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
