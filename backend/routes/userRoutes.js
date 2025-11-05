import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';

import { verifyAdmin, verifyToken, verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/users', verifyToken, verifyAdmin, getAllUsers);

router.get('/users/:id', verifyToken, verifyUser, getSingleUser);

router.put('/users/:id', verifyToken, verifyUser, updateUser);

router.delete('/users/:id', verifyToken, verifyUser, deleteUser);

export default router;
