// src/app.js (na pasta da API - CORREÇÃO CORS APLICADA)
import express from 'express';
import cors from 'cors';
import focusRoutes from './routes/focusRoutes.js';

const app = express();

// --- Middlewares ---

const allowedOrigins = [
  'http://localhost:5500',         // Frontend local (Live Server)
  'http://127.0.0.1:5500',        // Frontend local (Live Server)
  'https://thauan0.github.io'     
  
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requisições sem 'origin' (ex: Postman, curl) OU se a origem está na lista
   
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Permite a requisição
    } else {
      // Loga a origem bloqueada para ajudar no debug no servidor
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Origin not allowed by CORS')); // Bloqueia a requisição
    }
  },
  optionsSuccessStatus: 200 // Necessário para alguns clientes legados/browsers
}));

// Middleware para parsear JSON
app.use(express.json());

// --- Rotas ---
// Rota raiz informativa
app.get('/', (req, res) => {
    res.status(200).send('<h1>FocusFlow API</h1><p>Bem-vindo! Use as rotas /api/*</p>');
});

// Monta as rotas da API sob o prefixo /api
app.use('/api', focusRoutes);

// --- Middlewares de Erro (DEPOIS das rotas) ---

// Tratador 404 específico para rotas que começam com /api mas não foram encontradas
// Colocado depois de app.use('/api', focusRoutes) para pegar só o que não casou ali dentro
app.use('/api', (req, res, next) => {
    res.status(404).json({ message: 'Endpoint da API não encontrado.' });
});

// Tratador 404 genérico para qualquer outra rota não encontrada
// (Se chegar aqui, não é uma rota da API válida nem a raiz '/')
app.use((req, res, next) => {
    res.status(404).send('<h1>404 - Rota não encontrada</h1>');
});


// Tratador de erro geral (500) - Deve ser o último middleware
app.use((err, req, res, next) => {
    console.error("Erro no servidor:", err.stack || err); // Log detalhado do erro no servidor
    res.status(500).json({ message: 'Ocorreu um erro inesperado no servidor.' });
});

export default app;