//import prisma from "@/lib/prisma";

import { PrismaClient } from "@prisma/client";

const users = [
    {
        name: "OssiLV",
        email: "vohoanganhtruong@gmail.com",
        password: "OssiLV",
        phoneNumber: "0909123456",
    },
];
async function seed() {
    const prisma = new PrismaClient();
    for (const user of users) {
        await prisma.user.create({
            data: {
                name: "OssiLV",
                email: "vohoanganhtruong@gmail.com",
                password: "OssiLV",
                phoneNumber: "0909123456",
            },
        });
    }
}

seed().catch(console.error);
