import { prisma } from "@/lib/prisma";

export const resourceRepo = {
    async findAll() {
        return prisma.resource.findMany({ where: { isDeleted: false }, orderBy: { displayOrder: "asc" } });
    },

    async findAllVisible() {
        return prisma.resource.findMany({ where: { isDeleted: false, isVisible: true }, orderBy: { displayOrder: "asc" } });
    },

    async findById(id: string) {
        return prisma.resource.findFirst({ where: { id, isDeleted: false } });
    },

    async create(data: {
        title: string; description: string; type?: string;
        url: string; isVisible?: boolean; displayOrder?: number;
    }) {
        return prisma.resource.create({ data });
    },

    async update(id: string, data: Partial<{
        title: string; description: string; type: string;
        url: string; isVisible: boolean; displayOrder: number;
    }>) {
        return prisma.resource.update({ where: { id }, data });
    },

    async softDelete(id: string) {
        return prisma.resource.update({ where: { id }, data: { isDeleted: true } });
    },

    async count() {
        return prisma.resource.count({ where: { isDeleted: false } });
    },
};
