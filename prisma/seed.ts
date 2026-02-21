import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Seed Admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.admin.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            email: "admin@barmajli.com",
            password: hashedPassword,
            role: "admin",
        },
    });
    console.log("✅ Admin seeded");

    // Seed Services
    const services = [
        {
            title: "شرح مواد CS أونلاين",
            description: "شرح مبسط وشامل لمواد علوم الحاسوب الأساسية والمتقدمة.",
            icon: "BookOpen",
            targetAudience: "طلاب علوم الحاسوب",
            benefits: "فهم عميق للمواد، تحسين الدرجات",
            href: "/services#cs-tutoring",
            displayOrder: 1,
        },
        {
            title: "تنفيذ مشاريع تخرج",
            description: "مساعدة شاملة في تحليل وتصميم وتنفيذ مشاريع التخرج.",
            icon: "GraduationCap",
            targetAudience: "طلاب السنة الأخيرة",
            benefits: "مشروع متكامل، توثيق احترافي",
            href: "/services#graduation-projects",
            displayOrder: 2,
        },
        {
            title: "تنفيذ مشاريع برمجية",
            description: "بناء تطبيقات ومواقع كاملة حسب الطلب بأحدث التقنيات.",
            icon: "Code",
            targetAudience: "الطلاب والشركات الناشئة",
            benefits: "كود نظيف، تقنيات حديثة",
            href: "/services#software-projects",
            displayOrder: 3,
        },
        {
            title: "استشارات تقنية",
            description: "جلسات استشارية لحل المشاكل التقنية وتوجيه المسار المهني.",
            icon: "MessageSquare",
            targetAudience: "المطورين والطلاب",
            benefits: "توجيه مهني، حل مشاكل تقنية",
            href: "/services#consultation",
            displayOrder: 4,
        },
        {
            title: "كورسات مسجلة",
            description: "مكتبة من الكورسات المسجلة في مختلف المجالات البرمجية.",
            icon: "Video",
            targetAudience: "جميع المستويات",
            benefits: "تعلم ذاتي، محتوى متاح دائماً",
            href: "/services#courses",
            displayOrder: 5,
        },
        {
            title: "تدريب عملي",
            description: "برامج تدريبية لتجهيز الطلاب لسوق العمل.",
            icon: "LayoutDashboard",
            targetAudience: "طلاب وخريجين",
            benefits: "خبرة عملية، جاهزية لسوق العمل",
            href: "/services#training",
            displayOrder: 6,
        },
    ];

    for (const service of services) {
        await prisma.service.create({ data: service });
    }
    console.log("✅ Services seeded");

    // Seed Projects
    await prisma.project.create({
        data: {
            title: "منصة تعليمية تفاعلية لإدارة المحتوى الجامعي",
            description:
                "مشروع متكامل يحل مشكلة التواصل بين الطلاب والمحاضرين، مع لوحة تحكم شاملة ونظام إدارة محتوى. تم بناؤه باستخدام Next.js و Tailwind CSS لضمان الأداء والسرعة.",
            demoUrl: "https://harmonious-basbousa-bf2316.netlify.app/",
            tags: "Next.js,Tailwind CSS,React",
            featured: true,
        },
    });
    console.log("✅ Projects seeded");

    // Seed Resources
    await prisma.resource.create({
        data: {
            title: "بوت تليجرام للمساعدة البرمجية",
            description: "بوت تليجرام يساعدك في الإجابة على أسئلتك البرمجية بسرعة.",
            type: "TelegramBot",
            url: "https://t.me/BarmajliBot",
            isVisible: true,
            displayOrder: 1,
        },
    });
    console.log("✅ Resources seeded");

    console.log("\n🎉 Seed completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
