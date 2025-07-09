// src/app.js

import express from 'express';
import cors from 'cors'; // <-- 1. IMPORTAR O CORS AQUI
import routes from './routes/index.js'; // Supondo que suas rotas estão aqui

const app = express();

// MIDDLEWARES
app.use(cors()); // <-- 2. USAR O CORS COMO MIDDLEWARE GLOBAL AQUI
app.use(express.json()); // Middleware para interpretar JSON

// ROTAS
app.use('/api', routes); // Usando suas rotas

// Middleware para tratamento de erros (opcional, mas boa prática)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

export default app;