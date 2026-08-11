import { Pool } from "pg";
import { PrismaClient } from "./generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg"

// Caching the db to prevent mutiple connection to the db because of nextjs hot reload
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    adapter: adapter
})

if(process.env.NODE_ENV !=="production"){
    globalForPrisma.prisma = prisma
}