import { Router } from 'express';
import {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  getUserGifts
} from '../controllers/userController';

const router = Router();

// Rotas de usuário
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', getAllUsers);           // Listar todos os usuários
router.get('/:id', getUserById);        // Pegar usuário por ID
router.get('/:id/gifts', getUserGifts); // Listar presentes do usuário

export default router;