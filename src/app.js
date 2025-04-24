// src/app.js (na pasta da API - VERSÃO CORRIGIDA COM CORS)
import express from 'express';
import cors from 'cors'; // <--- 1. ADICIONE ESTA LINHA (Importar o cors)
import focusRoutes from './routes/focusRoutes.js'; // Import correto

const app = express();

// --- Middlewares ---

// 2. ADICIONE ESTA LINHA (Usar o middleware cors ANTES das rotas)
app.use(cors());
// Isso permite requisições de qualquer origem.
// Para ser mais específico: app.use(cors({ origin: 'http://127.0.0.1:5500' }));

// Middleware para parsear JSON (já estava aqui)
app.use(express.json());

// --- Rotas ---
// Rota raiz
app.get('/', (req, res) => {
    res.status(200).send('<h1>FocusFlow API</h1><p>Bem-vindo! Use as rotas /api/*</p>');
});

// Montar as rotas da API (já estava aqui)
app.use('/api', focusRoutes);

// --- Middlewares de Erro (DEPOIS das rotas) ---
// Middleware para tratar rotas não encontradas (404)
app.use((req, res, next) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(404).json({ message: 'Endpoint da API não encontrado.' });
    } else {
        res.status(404).send('<h1>404 - Página não encontrada</h1>');
    }
});

// Middleware básico para tratamento de erros gerais (500)
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err.stack || err);
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

export default app;