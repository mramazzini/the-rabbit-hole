"use server";
import { PrismaClient } from "@prisma/client";

export const getPage = async (route: string) => {
  const prisma = new PrismaClient();
  const res = await prisma.page.findUnique({
    where: {
      route: route,
    },
  });
  prisma.$disconnect();
  return res;
};

export const getPages = async () => {
  const prisma = new PrismaClient();
  const res = await prisma.page.findMany();
  prisma.$disconnect();
  return res;
};
