import { PrismaClient } from "@prisma/client";

let prismaInstance: PrismaClient | null = null;

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      console.error("DATABASE_URL environment variable is not set");
      console.error("Available env vars:", Object.keys(process.env).filter(k => k.includes("DATABASE") || k.includes("POSTGRES") || k.includes("NEON")).join(", "));
      throw new Error(
        "DATABASE_URL environment variable is not set. " +
        "Available: " + Object.keys(process.env).filter(k => k.includes("DATABASE") || k.includes("POSTGRES")).join(", ")
      );
    }

    try {
      prismaInstance = new PrismaClient({
        log: ["query", "error", "warn"],
      });
    } catch (error) {
      console.error("Failed to create PrismaClient:", error);
      throw error;
    }
  }
  return prismaInstance;
}
