import { Request, Response } from 'express';
import { getDB } from '../db';
import jwt from 'jsonwebtoken';

const db = getDB();
const JWT_SECRET = 'seu_segredo_aqui';

// Listar presentes de um usuário (GET /gifts/:userId)
export const getUserGifts = (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token inválido' });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const userId = decoded.id;

    const gifts = db.prepare('SELECT * FROM gifts WHERE user_id = ?').all(userId);
    res.json(gifts);

  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar presentes' });
  }
};

export const deleteGift = (req: Request, res: Response) => {
  const giftId = Number(req.params.id);
  if (!giftId) return res.status(400).json({ error: 'ID do presente inválido' });

  try {
    const stmt = db.prepare('DELETE FROM gifts WHERE id = ?');
    const info = stmt.run(giftId);
    if (info.changes === 0) return res.status(404).json({ error: 'Presente não encontrado' });

    res.json({ message: 'Presente excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir presente' });
  }
};

// Criar presente (POST /gifts)
export const createGift = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Não autorizado' });
  try {
    const decoded: any = jwt.verify(token, 'seu_segredo_aqui');
    const userId = decoded.id;

    const { title, description, image_url, product_link } = req.body;
    if (!title) return res.status(400).json({ error: 'Título é obrigatório' });

    const stmt = db.prepare(`
      INSERT INTO gifts (user_id, title, description, image_url, product_link)
      VALUES (?, ?, ?, ?, ?)
    `);
    const info = stmt.run(userId, title, description, image_url, product_link);
    res.status(201).json({ message: 'Presente criado', giftId: info.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar presente' });
  }

};



