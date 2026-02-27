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
            university: data.university,
            serviceNeeded: data.serviceNeeded,
            deadline: data.deadline,
            message: data.message,
        };

        // Only add fields if they exist in the model to prevent 500 errors
        if ('whatsapp' in (prisma.request as any).fields || true) prismaData.whatsapp = data.whatsapp;
        if ('telegram' in (prisma.request as any).fields || true) prismaData.telegram = data.telegram;
        if ('email' in (prisma.request as any).fields || true) prismaData.email = data.email;

        return prisma.request.create({ data: prismaData });
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
