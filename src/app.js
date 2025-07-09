// src/app.js (na pasta da API - CORREÇÃO CORS APLICADA)

import express from 'express';
import cors from 'cors';
import focusRoutes from './routes/focusRoutes.js';

const app = express();

// --- Middlewares ---

const allowedOrigins = [
  'http://localhost:5500',      // Seu frontend antigo ou de teste
  'http://127.0.0.1:5500',     // Alternativa para o frontend antigo
  'https://thauan0.github.io',  // Seu frontend em produção no GitHub Pages
  'http://localhost:3000'       // <-- ADICIONE ESTA LINHA PARA O SEU NEXT.JS LOCAL
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

// Middleware para parsear JSON
app.use(express.json());

// --- Rotas ---
app.get('/', (req, res) => {
    res.status(200).send('<h1>FocusFlow API</h1><p>Bem-vindo! Use as rotas /api/*</p>');
});
app.use('/api', focusRoutes);

// --- Middlewares de Erro ---
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