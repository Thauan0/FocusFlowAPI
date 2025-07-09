// src/app.js (VERSÃO FINAL E CORRETA)

import express from 'express';
import cors from 'cors';
// O './' é crucial aqui. Garante que o Node.js procure na mesma pasta.
import focusRoutes from './routes/focusRoutes.js'; 

const app = express();

// --- Middlewares ---

// Sua lista de origens permitidas está ótima, incluindo o localhost:3000.
const allowedOrigins = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://thauan0.github.io',
  'http://localhost:3000' 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Origin not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
}));

app.use(express.json());

// --- Rotas ---
app.get('/', (req, res) => {
    res.status(200).send('<h1>FocusFlow API</h1><p>Bem-vindo! Use as rotas /api/*</p>');
});
app.use('/api', focusRoutes);

// --- Middlewares de Erro (seu código aqui está perfeito) ---
app.use('/api', (req, res, next) => {
    res.status(404).json({ message: 'Endpoint da API não encontrado.' });
});
app.use((req, res, next) => {
    res.status(404).send('<h1>404 - Rota não encontrada</h1>');
});
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err.stack || err);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

export default app;