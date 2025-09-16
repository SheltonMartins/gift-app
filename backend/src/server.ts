// src/server.ts
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import giftRoutes from './routes/giftRoutes';
import friendsRoutes from './routes/friendsRoutes';

const app = express();
const PORT = 3000;

// Middleware CORS (permitindo requisições do frontend)
app.use(cors({
  origin: 'http://localhost:3001', // porta onde roda o React
  credentials: true,               // se precisar enviar cookies ou auth
}));

// Middleware para interpretar JSON
app.use(express.json());

// Rotas
app.use('/users', userRoutes);
app.use('/gifts', giftRoutes);
app.use('/friends', friendsRoutes);

// Rota raiz
app.get('/', (req, res) => res.send('API funcionando 🚀'));

// Inicializa o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
