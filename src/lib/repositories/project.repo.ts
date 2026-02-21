import { prisma } from "@/lib/prisma";

export const projectRepo = {
    async findAll() {
        return prisma.project.findMany({ where: { isDeleted: false }, orderBy: { createdAt: "desc" } });
    },

    async findFeatured() {
        return prisma.project.findMany({ where: { isDeleted: false, featured: true }, orderBy: { createdAt: "desc" } });
    },

    async findById(id: string) {
        return prisma.project.findFirst({ where: { id, isDeleted: false } });
    },

    async create(data: {
        title: string; description: string; imagePath?: string;
        demoUrl?: string; tags?: string; featured?: boolean;
    }) {
        return prisma.project.create({ data });
    },

    async update(id: string, data: Partial<{
        title: string; description: string; imagePath: string | null;
        demoUrl: string | null; tags: string | null; featured: boolean;
    }>) {
        return prisma.project.update({ where: { id }, data });
    },

    async softDelete(id: string) {
        return prisma.project.update({ where: { id }, data: { isDeleted: true } });
    },

    async count() {
        return prisma.project.count({ where: { isDeleted: false } });
    },
};
