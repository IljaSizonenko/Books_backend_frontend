"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("../src/generated/prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
require("dotenv/config");
exports.prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({
        connectionString: process.env.DATABASE_URL,
    }),
});
process.on("beforeExit", async () => {
    await exports.prisma.$disconnect();
});
