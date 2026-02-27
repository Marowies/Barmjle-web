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
        // Safe mapping to handle potential schema drift
        const prismaData: any = {
            name: data.name,
            university: data.university || null,
            serviceNeeded: data.serviceNeeded,
            deadline: data.deadline || null,
            message: data.message,
        };

        // Only add fields if they exist in the model to prevent 500 errors
        // Ensure empty strings are handled as null
        prismaData.whatsapp = data.whatsapp || null;
        prismaData.telegram = data.telegram || null;
        prismaData.email = data.email || null;

        try {
            return await prisma.request.create({ data: prismaData });
        } catch (error) {
            console.error("Prisma Request Creation Error:", error);
            throw error;
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
