import express from 'express';
import {
  getUsers,
  countUsers,
  addUser,
  updateUser,
  deleteUser,
} from '../../controllers/admin/adminUserController.js';

const router = express.Router();

// All routes are protected & admin only
router.get('/users', getUsers);
router.get('/users/count', countUsers);
router.post('/users', addUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
