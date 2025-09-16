import { Router } from 'express';
import { getUserGifts, createGift } from '../controllers/giftController';

const router = Router();

// Lista todos os presentes de um usuário (GET /gifts/:userId)
router.get('/:userId', getUserGifts);

// Cria um novo presente (POST /gifts)
// Espera o corpo da requisição com { userId, title, description, image_url, product_link }
router.post('/', createGift);

export default router;
