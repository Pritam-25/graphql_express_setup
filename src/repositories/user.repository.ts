import { PrismaClient } from '@generated/prisma/client.js';

export async function findUserById(prisma: PrismaClient, userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
  });
}

export async function findAllUsers(prisma: PrismaClient) {
  return prisma.user.findMany();
}

export async function findUserByEmail(prisma: PrismaClient, email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function createUser(
  prisma: PrismaClient,
  data: {
    email: string;
    name: string;
    password: string;
  }
) {
  return prisma.user.create({
    data,
  });
}
