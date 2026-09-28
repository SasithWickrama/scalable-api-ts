import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client';

import {
  authenticateUser,
  createUser,
  deleteUser,
  getAllUsers,
  updateUser
} from '../services/userService';

import { generateToken } from '../utils/jwt';

import { AuthRequest } from '../middlewares/auth';


export const getUsers = async (
  req: Request,
  res: Response
) => {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Failed to retrieve users'
    });
  }
};


export const addUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required'
      });
    }

    const user = await createUser(
      name,
      email,
      password
    );

    res.status(201).json(user);

  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      message: 'Failed to create user'
    });
  }
};


export const loginUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required'
      });
    }

    const user = await authenticateUser(
      email,
      password
    );

    if (!user) {
      return res.status(401).json({
        message: 'Invalid email or password'
      });
    }

    const token = generateToken(user.id);

    res.json({
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Login failed'
    });
  }
};


export const updateUserById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }

    if (req.userId !== id) {
      return res.status(403).json({
        message: 'You can only update your own account'
      });
    }

    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required'
      });
    }

    const user = await updateUser(
      id,
      name,
      email
    );

    res.json(user);

  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === 'P2025') {
        return res.status(404).json({
          message: 'User not found'
        });
      }

      if (error.code === 'P2002') {
        return res.status(409).json({
          message: 'Email already exists'
        });
      }
    }

    res.status(500).json({
      message: 'Failed to update user'
    });
  }
};


export const deleteUserById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid user ID'
      });
    }

    if (req.userId !== id) {
      return res.status(403).json({
        message: 'You can only delete your own account'
      });
    }

    await deleteUser(id);

    res.json({
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.status(500).json({
      message: 'Failed to delete user'
    });
  }
};