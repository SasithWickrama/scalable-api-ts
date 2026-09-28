import { Router } from 'express';

import {
    addUser,
    deleteUserById,
    getUsers,
    loginUser,
    updateUserById
} from '../controllers/userController';

import { authenticateToken } from '../middlewares/auth';

const router = Router();


// Public
router.post('/users', addUser);
router.post('/login', loginUser);


// Protected
router.get('/users', authenticateToken, getUsers);

router.put(
  '/users/:id',
  authenticateToken,
  updateUserById
);

router.delete(
  '/users/:id',
  authenticateToken,
  deleteUserById
);

export default router;