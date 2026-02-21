import { prisma } from "@/lib/prisma";

export const serviceRepo = {
    async findAll() {
        return prisma.service.findMany({ where: { isDeleted: false }, orderBy: { displayOrder: "asc" } });
    },

    async findAllActive() {
        return prisma.service.findMany({ where: { isDeleted: false, isActive: true }, orderBy: { displayOrder: "asc" } });
    },

    async findById(id: string) {
        return prisma.service.findFirst({ where: { id, isDeleted: false } });
    },

    async create(data: {
        title: string; description: string; icon?: string; category?: string;
        targetAudience?: string; benefits?: string; href?: string; displayOrder?: number;
    }) {
        return prisma.service.create({ data });
    },

    async update(id: string, data: Partial<{
        title: string; description: string; icon: string; category: string;
        targetAudience: string | null; benefits: string | null; href: string | null;
        displayOrder: number; isActive: boolean;
    }>) {
        return prisma.service.update({ where: { id }, data });
    },

    async softDelete(id: string) {
        return prisma.service.update({ where: { id }, data: { isDeleted: true } });
    },

    async count() {
        return prisma.service.count({ where: { isDeleted: false } });
    },
};
