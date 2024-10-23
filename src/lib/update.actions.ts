"use server";
import { PrismaClient } from "@prisma/client";

export const updatePage = async (route: string, content: string) => {
  const prisma = new PrismaClient();
  const res = await prisma.page.update({
    where: {
      route,
    },
    data: {
      route,
      content,
    },
  });
  prisma.$disconnect();
  return res;
};

export const updateRoute = async (route: {
  oldRoute: string;
  newRoute: string;
}) => {
  const prisma = new PrismaClient();
  const res = await prisma.page.update({
    where: {
      route: route.oldRoute,
    },
    data: {
      route: route.newRoute,
    },
  });
  prisma.$disconnect();
  return res;
};

export const togglePublishPage = async (route: string) => {
  const prisma = new PrismaClient();
  const page = await prisma.page.findUnique({
    where: {
      route,
    },
  });
  const published = page?.published;

  const res = await prisma.page.update({
    where: {
      route,
    },
    data: {
      published: !published,
    },
  });
  prisma.$disconnect();
  return res;
};

export const toggleFrontPage = async (route: string) => {
  const prisma = new PrismaClient();
  const page = await prisma.page.findUnique({
    where: {
      route,
    },
  });
  const frontPage = page?.frontpage;

  const res = await prisma.page.update({
    where: {
      route,
    },
    data: {
      frontpage: !frontPage,
    },
  });
  prisma.$disconnect();
  return res;
};
