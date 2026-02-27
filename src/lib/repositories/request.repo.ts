import { prisma } from "@/lib/prisma";

export const requestRepo = {
    async findAll(status?: string) {
        const where: { isDeleted: boolean; status?: string } = { isDeleted: false };
        if (status && status !== "all") where.status = status;
        return prisma.request.findMany({ where, orderBy: { createdAt: "desc" } });
    },

    async findById(id: string) {
        return prisma.request.findFirst({ where: { id, isDeleted: false } });
    },

    async create(data: { name: string; university?: string; serviceNeeded: string; deadline?: string; message: string; whatsapp?: string; telegram?: string; email?: string }) {
        const baseData = {
            name: data.name,
            university: data.university || null,
            serviceNeeded: data.serviceNeeded,
            deadline: data.deadline || null,
            message: data.message,
        };

        const extraData = {
            whatsapp: data.whatsapp || null,
            telegram: data.telegram || null,
            email: data.email || null,
        };

        console.log("Attempting to create request in DB...");

        try {
            // Attempt full creation
            return await prisma.request.create({
                data: {
                    ...baseData,
                    ...extraData
                }
            });
        } catch (error: any) {
            console.error("Full Request Creation Failed:", error.message);

            // Fallback: Attempt base creation (in case schema drift on prod means new columns missing)
            console.log("Attempting fallback creation with base fields only...");
            try {
                return await prisma.request.create({
                    data: baseData
                });
            } catch (fallbackError: any) {
                console.error("Base Request Creation Also Failed:", fallbackError.message);
                throw new Error("فشل حفظ الطلب في قاعدة البيانات. برجاء التواصل عبر الواتساب مباشرة.");
            }
        }
    },

    async updateStatus(id: string, status: string) {
        return prisma.request.update({ where: { id }, data: { status } });
    },

    async softDelete(id: string) {
        return prisma.request.update({ where: { id }, data: { isDeleted: true } });
    },

    async countAll() {
        return prisma.request.count({ where: { isDeleted: false } });
    },

    async countByStatus(status: string) {
        return prisma.request.count({ where: { isDeleted: false, status } });
    },

    async findLatest(take = 5) {
        return prisma.request.findMany({ where: { isDeleted: false }, orderBy: { createdAt: "desc" }, take });
    },
};
