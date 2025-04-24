// src/routes/focusRoutes.js

import express from 'express';
import {
    getRandomQuote,
    getRandomTechnique,
    getRandomBreakSuggestion,
    getDefaultPomodoroParams
} from '../controllers/focusController.js'; // Importa as funções do controller

const router = express.Router();

// --- Definição das Rotas GET ---

// Rota: GET /quote (será /api/quote no final)
router.get('/quote', getRandomQuote);

// Rota: GET /technique (será /api/technique no final)
router.get('/technique', getRandomTechnique);

// Rota: GET /break (será /api/break no final)
router.get('/break', getRandomBreakSuggestion);

// Rota: GET /pomodoro/default (será /api/pomodoro/default no final)
router.get('/pomodoro/default', getDefaultPomodoroParams);

export default router;