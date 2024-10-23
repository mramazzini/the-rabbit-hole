"use server";
import { PrismaClient } from "@prisma/client";

export const createPage = async (page: { route: string; content: string }) => {
  const prisma = new PrismaClient();
  const res = await prisma.page.create({
    data: {
      route: page.route,
      content: page.content,
    },
  });
  prisma.$disconnect();
  return res;
};
