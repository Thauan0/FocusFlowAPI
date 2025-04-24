// src/controllers/focusController.js

// 1. Importar os dados e a função utilitária
import { quotes } from '../data/quotes.js';
import { techniques } from '../data/techniques.js';
import { breakSuggestions } from '../data/breaks.js';
import { getRandomItem } from '../utils/helpers.js';

// --- Funções do Controller ---

/**
 * @description Obtém e retorna uma citação motivacional aleatória.
 * @route GET /api/quote
 * @access Public
 */
export const getRandomQuote = (req, res) => {
    try {
        const randomQuote = getRandomItem(quotes);

        if (randomQuote) {
            res.status(200).json(randomQuote);
        } else {
            // Isso só aconteceria se o array 'quotes' estivesse vazio
            res.status(404).json({ message: 'Nenhuma citação encontrada.' });
        }
    } catch (error) {
        console.error("Erro em getRandomQuote:", error); // Manter log de erro
        res.status(500).json({ message: 'Erro interno ao buscar citação.' });
    }
};

/**
 * @description Obtém e retorna uma técnica de foco aleatória.
 * @route GET /api/technique
 * @access Public
 */
export const getRandomTechnique = (req, res) => {
    try {
        const randomTechnique = getRandomItem(techniques);

        if (randomTechnique) {
            res.status(200).json(randomTechnique);
        } else {
            res.status(404).json({ message: 'Nenhuma técnica encontrada.' });
        }
    } catch (error) {
        console.error("Erro em getRandomTechnique:", error); // Manter log de erro
        res.status(500).json({ message: 'Erro interno ao buscar técnica.' });
    }
};

/**
 * @description Obtém e retorna uma sugestão de pausa aleatória.
 * @route GET /api/break
 * @access Public
 */
export const getRandomBreakSuggestion = (req, res) => {
    try {
        const randomBreak = getRandomItem(breakSuggestions);

        if (randomBreak) {
            res.status(200).json(randomBreak);
        } else {
            res.status(404).json({ message: 'Nenhuma sugestão de pausa encontrada.' });
        }
    } catch (error) {
        console.error("Erro em getRandomBreakSuggestion:", error); // Manter log de erro
        res.status(500).json({ message: 'Erro interno ao buscar sugestão de pausa.' });
    }
};

/**
 * @description Retorna os parâmetros padrão para a Técnica Pomodoro.
 * @route GET /api/pomodoro/default
 * @access Public
 */
export const getDefaultPomodoroParams = (req, res) => {
    try {
        const pomodoroDefaults = {
            work_minutes: 25,
            short_break_minutes: 5,
            long_break_minutes: 15,
            cycles_before_long_break: 4
        };
        res.status(200).json(pomodoroDefaults);
    } catch (error) {
        // É muito improvável que haja erro aqui, mas por segurança
        console.error("Erro em getDefaultPomodoroParams:", error); // Manter log de erro
        res.status(500).json({ message: 'Erro interno ao buscar parâmetros Pomodoro.' });
    }
};