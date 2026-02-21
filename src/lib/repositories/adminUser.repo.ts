import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const adminUserRepo = {
    async findByUsername(username: string) {
        return prisma.adminUser.findUnique({ where: { username } });
    },

    async findByEmail(email: string) {
        return prisma.adminUser.findUnique({ where: { email } });
    },

    async findAll() {
        return prisma.adminUser.findMany({
            select: { id: true, fullName: true, username: true, email: true, role: true, isActive: true, createdAt: true },
            orderBy: { createdAt: "desc" },
        });
    },

    async findById(id: string) {
        return prisma.adminUser.findUnique({ where: { id } });
    },

    async create(data: { fullName: string; username: string; email: string; password: string; role?: string }) {
        const passwordHash = await bcrypt.hash(data.password, 12);
        return prisma.adminUser.create({
            data: {
                fullName: data.fullName,
                username: data.username,
                email: data.email,
                passwordHash,
                role: data.role || "Admin",
            },
        });
    },

    async setActive(id: string, isActive: boolean) {
        return prisma.adminUser.update({ where: { id }, data: { isActive } });
    },
};
