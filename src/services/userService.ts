import bcrypt from 'bcryptjs';
import { prisma } from '../utils/prisma';

export const authenticateUser = async (
  email: string,
  password: string
) => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!passwordMatches) {
    return null;
  }

  return user;
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true
    }
  });
};

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const passwordHash = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      name,
      email,
      passwordHash
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
};

export const updateUser = async (
  id: number,
  name: string,
  email: string
) => {
  return await prisma.user.update({
    where: {
      id
    },
    data: {
      name,
      email
    },
    select: {
      id: true,
      name: true,
      email: true
    }
  });
};

export const deleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id
    }
  });
};