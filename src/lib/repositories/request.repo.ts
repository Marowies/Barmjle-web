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
        return prisma.request.create({ data });
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
