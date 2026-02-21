import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

async function main() {
    console.log("🌱 Starting seed...");

    // Clean existing data
    await prisma.request.deleteMany();
    await prisma.service.deleteMany();
    await prisma.project.deleteMany();
    await prisma.resource.deleteMany();
    await prisma.adminUser.deleteMany();

    // Create SuperAdmin
    const superAdminHash = await bcrypt.hash("Admin@1234", 12);
    const superAdmin = await prisma.adminUser.create({
        data: {
            fullName: "المشرف الرئيسي",
            username: "superadmin",
            email: "superadmin@barmajli.com",
            passwordHash: superAdminHash,
            role: "SuperAdmin",
        },
    });
    console.log("✅ SuperAdmin created:", superAdmin.username);

    // Create sample services
    const services = await Promise.all([
        prisma.service.create({
            data: {
                title: "تطوير المشاريع الأكاديمية",
                description: "مساعدتك في إنجاز مشروع التخرج وجميع المشاريع الجامعية بأعلى جودة",
                icon: "GraduationCap",
                category: "ProjectHelp",
                displayOrder: 1,
            },
        }),
        prisma.service.create({
            data: {
                title: "دورات تدريبية متخصصة",
                description: "دورات في البرمجة وتطوير الويب والذكاء الاصطناعي للمبتدئين والمتقدمين",
                icon: "BookOpen",
                category: "Course",
                displayOrder: 2,
            },
        }),
        prisma.service.create({
            data: {
                title: "بوتات تليجرام الذكية",
                description: "تطوير بوتات تليجرام مخصصة لأعمالك أو حياتك الشخصية",
                icon: "MessageSquare",
                category: "Bot",
                displayOrder: 3,
            },
        }),
    ]);
    console.log("✅ Services created:", services.length);

    // Create sample projects
    const projects = await Promise.all([
        prisma.project.create({
            data: {
                title: "منصة برمجلي",
                description: "منصة تعليمية وخدمية متكاملة لدعم طلاب البرمجة",
                tags: "Next.js, TypeScript, Prisma, Tailwind",
                featured: true,
            },
        }),
        prisma.project.create({
            data: {
                title: "نظام إدارة الطلاب",
                description: "نظام شامل لإدارة بيانات الطلاب والدرجات والحضور",
                tags: "React, Node.js, MongoDB",
                featured: false,
            },
        }),
    ]);
    console.log("✅ Projects created:", projects.length);

    // Create sample resources
    const resources = await Promise.all([
        prisma.resource.create({
            data: {
                title: "بوت برمجلي للمساعدة",
                description: "بوت تليجرام للحصول على مساعدة برمجية فورية",
                type: "TelegramBot",
                url: "https://t.me/barmajlibot",
                displayOrder: 1,
            },
        }),
        prisma.resource.create({
            data: {
                title: "قناة يوتيوب التعليمية",
                description: "دروس تعليمية مجانية في البرمجة وتطوير الويب",
                type: "YouTube",
                url: "https://youtube.com/@barmajli",
                displayOrder: 2,
            },
        }),
    ]);
    console.log("✅ Resources created:", resources.length);

    console.log("\n🎉 Seed completed successfully!");
    console.log("📋 Login credentials:");
    console.log("   Username: superadmin");
    console.log("   Password: Admin@1234");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
