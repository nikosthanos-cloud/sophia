import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not set");
    }

    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
}
